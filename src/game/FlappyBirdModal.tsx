import { useEffect, useState } from 'react'
import { useFlappyBird } from './useFlappyBird'

type ThemeMode = 'dark' | 'light'

type FlappyBirdModalProps = {
  isOpen: boolean
  onClose: () => void
  theme: ThemeMode
}

export const FlappyBirdModal = ({ isOpen, onClose, theme }: FlappyBirdModalProps) => {
  const { canvasRef, score, highScore, isGameOver, soundEnabled, setSoundEnabled, restartGame } =
    useFlappyBird({ isOpen, theme })
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('game-active', isOpen)
    return () => {
      document.body.classList.remove('game-active')
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    const updateViewport = () => {
      setIsCompact(window.innerWidth < 769)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  if (!isOpen) return null

  const overlayClasses =
    theme === 'dark'
      ? 'bg-slate-950/88 text-slate-100'
      : 'bg-white/88 text-amber-950'

  const panelClasses =
    theme === 'dark'
      ? 'border-white/10 bg-slate-900/90 shadow-[0_30px_90px_rgba(2,6,23,0.78)]'
      : 'border-amber-900/15 bg-white/96 shadow-[0_30px_90px_rgba(255,200,100,0.28)]'

  const accentClasses =
    theme === 'dark'
      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
      : 'bg-gradient-to-r from-[#ffc864] to-[#ffb347] text-amber-950'

  const secondaryButtonClasses =
    theme === 'dark'
      ? 'border-white/15 bg-white/5 text-slate-100 hover:bg-white/10'
      : 'border-amber-900/15 bg-[#fff7e6] text-amber-950 hover:bg-[#ffefcb]'

  return (
    <div
      className={`fixed inset-0 z-[80] px-3 py-3 backdrop-blur-md md:flex md:items-center md:justify-center md:px-4 md:py-6 ${overlayClasses}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flappy-bird-title"
    >
      <div className={`game-shell relative mx-auto flex h-full max-h-[calc(100dvh-24px)] w-full max-w-5xl flex-col overflow-hidden rounded-[1.6rem] border md:h-auto md:max-h-[min(92vh,860px)] md:rounded-[2rem] ${panelClasses}`}>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

        {(!isCompact || isGameOver) && (
          <button
            type="button"
            onClick={onClose}
            className={`absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border md:right-4 md:top-4 md:h-11 md:w-11 ${secondaryButtonClasses}`}
            aria-label="Close Flappy Bird game"
          >
            X
          </button>
        )}

        <div className="relative grid h-full min-h-0 grid-cols-1 gap-3 p-2 md:gap-4 md:p-4 min-[769px]:grid-cols-[minmax(0,1.2fr)_240px] min-[900px]:grid-cols-[minmax(0,1fr)_290px] min-[769px]:gap-5 min-[900px]:gap-6 min-[769px]:p-5 min-[900px]:p-7">
          <div className="flex min-h-0 min-w-0 flex-col gap-2 md:gap-3 min-[769px]:justify-between min-[900px]:gap-4">
            <div className={`${isCompact ? 'hidden' : 'space-y-1.5 md:space-y-2'}`}>
              <p className="text-xs uppercase tracking-[0.32em] opacity-70">Hidden Arcade Mode</p>
              <h2 id="flappy-bird-title" className="pr-10 text-xl font-bold leading-tight md:pr-0 md:text-3xl min-[769px]:text-[2rem] min-[900px]:text-4xl">
                Flappy Akshay
              </h2>
              <p className="max-w-2xl text-[11px] opacity-80 md:text-sm min-[769px]:max-w-xl min-[769px]:text-sm min-[900px]:text-base">
                Tap, click, or press space to stay airborne. Pipes get tighter as you chase a new high score.
              </p>
            </div>

            <div className={`game-canvas-wrap flex flex-1 items-center justify-center ${isCompact ? 'min-h-0 py-1' : 'mt-2 min-h-[300px] md:mt-3 md:min-h-[360px] min-[769px]:mt-4 min-[769px]:min-h-0 min-[900px]:mt-0'}`}>
              <canvas
                ref={canvasRef}
                className="game-canvas touch-none rounded-[1.5rem] border border-white/10 shadow-2xl"
                aria-label="Flappy Bird style game canvas"
              />
            </div>
          </div>

          <aside className={`${isCompact ? 'hidden min-[769px]:flex' : 'flex'} flex-col justify-between gap-2 rounded-[1.25rem] border border-white/10 bg-white/5 p-3 md:gap-3 md:p-4 md:rounded-[1.5rem] min-[769px]:gap-3 min-[769px]:p-4 min-[900px]:gap-4 min-[900px]:p-5`}>
            <div className="space-y-2 md:space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 md:p-3">
                  <p className="text-xs uppercase tracking-[0.18em] opacity-60">Score</p>
                  <p className="mt-1 text-2xl font-bold md:mt-2 md:text-3xl min-[769px]:text-[2rem] min-[900px]:text-3xl">{score}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 md:p-3">
                  <p className="text-xs uppercase tracking-[0.18em] opacity-60">High Score</p>
                  <p className="mt-1 text-2xl font-bold md:mt-2 md:text-3xl min-[769px]:text-[2rem] min-[900px]:text-3xl">{highScore}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 md:p-4">
                <p className="text-xs uppercase tracking-[0.18em] opacity-60">Controls</p>
                <p className="mt-1 text-xs opacity-80 md:mt-2 md:text-sm min-[769px]:text-[13px] min-[900px]:text-sm">Tap or click to jump. Press `Space`, `Arrow Up`, or `R` to restart.</p>
              </div>

              {isGameOver && (
                <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 p-2.5 md:p-4">
                  <p className="text-sm font-semibold md:text-lg min-[769px]:text-base min-[900px]:text-lg">Game Over</p>
                  <p className="mt-1 text-[11px] opacity-80 md:text-sm min-[769px]:text-xs min-[900px]:text-sm">You clipped a pipe. Restart and try again.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 pb-1 min-[769px]:block min-[769px]:space-y-3">
              <button
                type="button"
                onClick={restartGame}
                className={`inline-flex min-h-[40px] w-full items-center justify-center rounded-2xl px-2 py-2 text-xs font-semibold transition-transform duration-200 hover:scale-[1.02] md:min-h-[46px] md:px-4 md:py-3 md:text-sm min-[769px]:min-h-[48px] min-[769px]:text-base ${accentClasses}`}
              >
                Restart
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((value) => !value)}
                aria-pressed={soundEnabled}
                className={`inline-flex min-h-[40px] w-full items-center justify-center rounded-2xl border px-2 py-2 text-xs font-medium transition md:min-h-[46px] md:px-4 md:py-3 md:text-sm min-[769px]:min-h-[48px] min-[769px]:text-base ${secondaryButtonClasses}`}
              >
                {soundEnabled ? 'Sound On' : 'Sound Off'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`inline-flex min-h-[40px] w-full items-center justify-center rounded-2xl border px-2 py-2 text-xs font-medium transition md:min-h-[46px] md:px-4 md:py-3 md:text-sm min-[769px]:min-h-[48px] min-[769px]:text-base ${secondaryButtonClasses}`}
              >
                Close
              </button>
            </div>
          </aside>
        </div>

        {isCompact && isGameOver && (
          <div className="absolute inset-x-3 bottom-3 z-20 rounded-[1.4rem] border border-white/10 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Score</p>
                <p className="mt-1 text-2xl font-bold">{score}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">High Score</p>
                <p className="mt-1 text-2xl font-bold">{highScore}</p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3">
              <p className="text-sm font-semibold">Game Over</p>
              <p className="mt-1 text-xs opacity-80">You clipped a pipe. Restart and try again.</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={restartGame}
                className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl px-3 py-2 text-sm font-semibold ${accentClasses}`}
              >
                Restart
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border px-3 py-2 text-sm font-medium ${secondaryButtonClasses}`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
