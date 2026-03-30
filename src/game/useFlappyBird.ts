import { useCallback, useEffect, useRef, useState } from 'react'

type ThemeMode = 'dark' | 'light'

type Pipe = {
  x: number
  width: number
  gapY: number
  gapHeight: number
  counted: boolean
}

type Bird = {
  x: number
  y: number
  velocity: number
  radius: number
  rotation: number
}

type GameState = {
  bird: Bird
  pipes: Pipe[]
  score: number
  isGameOver: boolean
  lastTime: number
  spawnTimer: number
}

type UseFlappyBirdOptions = {
  isOpen: boolean
  theme: ThemeMode
}

const HIGH_SCORE_KEY = 'flappy-high-score'
const GRAVITY = 1450
const JUMP_VELOCITY = -380
const PIPE_SPEED = 190
const PIPE_SPAWN_MS = 1500

const createInitialState = (): GameState => ({
  bird: {
    x: 92,
    y: 220,
    velocity: 0,
    radius: 16,
    rotation: 0,
  },
  pipes: [],
  score: 0,
  isGameOver: false,
  lastTime: 0,
  spawnTimer: 0,
})

export const useFlappyBird = ({ isOpen, theme }: UseFlappyBirdOptions) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const stateRef = useRef<GameState>(createInitialState())
  const audioContextRef = useRef<AudioContext | null>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType) => {
      if (!soundEnabled || typeof window === 'undefined') return

      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }

      const context = audioContextRef.current
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const now = context.currentTime

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, now)
      gain.gain.setValueAtTime(0.001, now)
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(now)
      oscillator.stop(now + duration)
    },
    [soundEnabled]
  )

  const readHighScore = useCallback(() => {
    const stored = window.localStorage.getItem(HIGH_SCORE_KEY)
    const parsed = stored ? Number.parseInt(stored, 10) : 0
    const safeScore = Number.isFinite(parsed) ? parsed : 0
    setHighScore(safeScore)
    return safeScore
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const isCompact = window.innerWidth < 769
    const isMidSplit = window.innerWidth >= 769 && window.innerWidth < 900
    const isTablet = window.innerWidth >= 900 && window.innerWidth < 1024
    const horizontalPadding = isCompact ? 20 : isMidSplit ? 118 : isTablet ? 88 : 32
    const maxWidth = Math.min(window.innerWidth - horizontalPadding, isCompact ? 520 : isMidSplit ? 400 : isTablet ? 440 : 420)
    const width = Math.max(isCompact ? 300 : isMidSplit ? 320 : isTablet ? 360 : 280, Math.floor(maxWidth))
    const reservedHeight = isCompact ? 92 : isMidSplit ? 220 : isTablet ? 300 : 180
    const maxHeight = Math.max(isCompact ? 420 : isMidSplit ? 360 : isTablet ? 460 : 420, window.innerHeight - reservedHeight)
    const targetHeight = isCompact ? window.innerHeight * 0.78 : isMidSplit ? window.innerHeight * 0.48 : isTablet ? window.innerHeight * 0.5 : window.innerHeight * 0.72
    const height = Math.min(maxHeight, Math.max(isCompact ? 420 : isMidSplit ? 360 : isTablet ? 460 : 420, Math.floor(targetHeight)))

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')
    if (!context) return
    context.setTransform(dpr, 0, 0, dpr, 0, 0)

    const state = stateRef.current
    state.bird.x = Math.max(78, width * 0.24)
    if (state.bird.y > height - 80) {
      state.bird.y = height * 0.5
      state.bird.velocity = 0
    }
  }, [])

  const drawScene = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const width = Number.parseFloat(canvas.style.width || '0')
    const height = Number.parseFloat(canvas.style.height || '0')
    const state = stateRef.current
    const palette =
      theme === 'dark'
        ? {
            skyTop: '#020617',
            skyBottom: '#0f172a',
            glow: 'rgba(59, 130, 246, 0.45)',
            pipe: '#38bdf8',
            pipeShadow: '#0f172a',
            ground: '#111827',
            bird: '#facc15',
            wing: '#fde68a',
            text: '#e2e8f0',
          }
        : {
            skyTop: '#fffdf6',
            skyBottom: '#ffe7b0',
            glow: 'rgba(255, 200, 100, 0.35)',
            pipe: '#f59e0b',
            pipeShadow: '#fff4d7',
            ground: '#fff7e6',
            bird: '#fb923c',
            wing: '#fed7aa',
            text: '#5b3b00',
          }

    const gradient = context.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, palette.skyTop)
    gradient.addColorStop(1, palette.skyBottom)
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)

    context.fillStyle = palette.glow
    context.beginPath()
    context.arc(width * 0.18, height * 0.2, 72, 0, Math.PI * 2)
    context.fill()

    for (let i = 0; i < 7; i += 1) {
      const waveY = height - 18 + Math.sin((Date.now() / 220) + i) * 4
      context.fillStyle = theme === 'dark' ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.34)'
      context.fillRect(i * 72, waveY, 56, 10)
    }

    state.pipes.forEach((pipe) => {
      context.fillStyle = palette.pipeShadow
      context.fillRect(pipe.x + 5, 0, pipe.width, pipe.gapY - pipe.gapHeight / 2)
      context.fillRect(
        pipe.x + 5,
        pipe.gapY + pipe.gapHeight / 2,
        pipe.width,
        height - (pipe.gapY + pipe.gapHeight / 2) - 40
      )

      const pipeGradient = context.createLinearGradient(pipe.x, 0, pipe.x + pipe.width, 0)
      pipeGradient.addColorStop(0, palette.pipe)
      pipeGradient.addColorStop(1, theme === 'dark' ? '#1d4ed8' : '#f97316')
      context.fillStyle = pipeGradient
      context.fillRect(pipe.x, 0, pipe.width, pipe.gapY - pipe.gapHeight / 2)
      context.fillRect(
        pipe.x,
        pipe.gapY + pipe.gapHeight / 2,
        pipe.width,
        height - (pipe.gapY + pipe.gapHeight / 2) - 40
      )
    })

    context.fillStyle = palette.ground
    context.fillRect(0, height - 40, width, 40)

    const { bird } = state
    context.save()
    context.translate(bird.x, bird.y)
    context.rotate(bird.rotation)
    context.fillStyle = palette.bird
    context.beginPath()
    context.arc(0, 0, bird.radius, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = palette.wing
    context.beginPath()
    context.ellipse(-2, 4, 9, 6, -0.4, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = '#ffffff'
    context.beginPath()
    context.arc(5, -4, 5, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = '#111827'
    context.beginPath()
    context.arc(7, -4, 2, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = '#fb7185'
    context.beginPath()
    context.moveTo(14, -1)
    context.lineTo(23, 2)
    context.lineTo(14, 6)
    context.closePath()
    context.fill()
    context.restore()

    context.fillStyle = palette.text
    context.font = "700 18px Poppins, sans-serif"
    context.fillText(`Score ${state.score}`, 16, 28)
  }, [theme])

  const finishGame = useCallback(() => {
    const state = stateRef.current
    if (state.isGameOver) return

    state.isGameOver = true
    setIsGameOver(true)
    playTone(180, 0.24, 'sawtooth')

    setHighScore((currentHighScore) => {
      if (state.score > currentHighScore) {
        window.localStorage.setItem(HIGH_SCORE_KEY, String(state.score))
        return state.score
      }
      return currentHighScore
    })
  }, [playTone])

  const jump = useCallback(() => {
    const state = stateRef.current
    if (state.isGameOver) {
      stateRef.current = {
        ...createInitialState(),
        bird: {
          ...createInitialState().bird,
          x: state.bird.x,
          y: state.bird.y,
        },
      }
      setScore(0)
      setIsGameOver(false)
      playTone(520, 0.08, 'square')
      return
    }

    state.bird.velocity = JUMP_VELOCITY
    state.bird.rotation = -0.5
    playTone(620, 0.07, 'square')
  }, [playTone])

  const restartGame = useCallback(() => {
    const canvas = canvasRef.current
    stateRef.current = createInitialState()

    if (canvas) {
      const width = Number.parseFloat(canvas.style.width || '360')
      const height = Number.parseFloat(canvas.style.height || '560')
      stateRef.current.bird.x = Math.max(78, width * 0.24)
      stateRef.current.bird.y = height * 0.48
    }

    setScore(0)
    setIsGameOver(false)
    drawScene()
  }, [drawScene])

  const update = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const width = Number.parseFloat(canvas.style.width || '360')
      const height = Number.parseFloat(canvas.style.height || '560')
      const state = stateRef.current

      if (state.lastTime === 0) {
        state.lastTime = timestamp
      }

      const deltaTime = Math.min((timestamp - state.lastTime) / 1000, 0.032)
      state.lastTime = timestamp

      if (!state.isGameOver) {
        state.spawnTimer += deltaTime * 1000
        state.bird.velocity += GRAVITY * deltaTime
        state.bird.y += state.bird.velocity * deltaTime
        state.bird.rotation = Math.min(1.2, Math.max(-0.55, state.bird.velocity / 500))

        if (state.spawnTimer >= PIPE_SPAWN_MS) {
          state.spawnTimer = 0
          const gapHeight = Math.max(128, height * 0.24)
          const margin = 92
          const gapY = margin + Math.random() * (height - 40 - margin * 2)

          state.pipes.push({
            x: width + 24,
            width: 62,
            gapY,
            gapHeight,
            counted: false,
          })
        }

        state.pipes = state.pipes
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED * deltaTime }))
          .filter((pipe) => pipe.x + pipe.width > -20)

        state.pipes.forEach((pipe) => {
          if (!pipe.counted && pipe.x + pipe.width < state.bird.x) {
            pipe.counted = true
            state.score += 1
            setScore(state.score)
            playTone(880, 0.05, 'triangle')
          }

          const hitsPipeX =
            state.bird.x + state.bird.radius > pipe.x &&
            state.bird.x - state.bird.radius < pipe.x + pipe.width
          const topPipeBottom = pipe.gapY - pipe.gapHeight / 2
          const bottomPipeTop = pipe.gapY + pipe.gapHeight / 2
          const hitsPipeY =
            state.bird.y - state.bird.radius < topPipeBottom ||
            state.bird.y + state.bird.radius > bottomPipeTop

          if (hitsPipeX && hitsPipeY) {
            finishGame()
          }
        })

        if (state.bird.y + state.bird.radius >= height - 40 || state.bird.y - state.bird.radius <= 0) {
          finishGame()
        }
      }

      drawScene()
      animationFrameRef.current = window.requestAnimationFrame(update)
    },
    [drawScene, finishGame, playTone]
  )

  useEffect(() => {
    if (!isOpen) return

    readHighScore()
    resizeCanvas()
    restartGame()
    drawScene()

    const onResize = () => {
      resizeCanvas()
      drawScene()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault()
        jump()
      }

      if (event.code === 'KeyR') {
        event.preventDefault()
        restartGame()
      }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
    animationFrameRef.current = window.requestAnimationFrame(update)

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
      stateRef.current.lastTime = 0
    }
  }, [drawScene, isOpen, jump, readHighScore, resizeCanvas, restartGame, update])

  useEffect(() => {
    if (!isOpen) return

    const onPointer = (event: Event) => {
      event.preventDefault()
      jump()
    }

    const canvas = canvasRef.current
    canvas?.addEventListener('pointerdown', onPointer, { passive: false })

    return () => {
      canvas?.removeEventListener('pointerdown', onPointer)
    }
  }, [isOpen, jump])

  useEffect(() => {
    return () => {
      audioContextRef.current?.close().catch(() => undefined)
      audioContextRef.current = null
    }
  }, [])

  return {
    canvasRef,
    score,
    highScore,
    isGameOver,
    soundEnabled,
    setSoundEnabled,
    restartGame,
    jump,
  }
}
