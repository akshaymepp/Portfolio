import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollReveal = (selector: string) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll(selector)
    
    gsap.to(elements, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 20%',
        once: true,
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [selector])

  return ref
}

export const useParallax = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        markers: false,
      },
      y: -100,
      duration: 1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return ref
}

export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const text = ref.current.textContent
    if (!text) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      {
        opacity: 1,
        clipPath: 'inset(0 0 0 0)',
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3,
      }
    )
  }, [])

  return ref
}

export const useFadeInOnScroll = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return ref
}

export const useHoverGlow = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(element, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => {
      gsap.to(element, {
        '--glow-opacity': 1,
        duration: 0.3,
      })
    }

    const onMouseLeave = () => {
      gsap.to(element, {
        '--glow-opacity': 0,
        duration: 0.3,
      })
    }

    element.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseenter', onMouseEnter)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseenter', onMouseEnter)
      element.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return ref
}

export const useCounterAnimation = (target: number, duration: number = 1.5) => {
  const ref = useRef<HTMLDivElement>(null)
  const valueRef = useRef(0)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(valueRef, {
      current: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(valueRef.current).toString()
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [target, duration])

  return ref
}
