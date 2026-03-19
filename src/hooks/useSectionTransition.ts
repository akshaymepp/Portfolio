import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type AnimationType =
  | 'fadeIn'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'stagger'

export interface TransitionConfig {
  animationType?: AnimationType
  duration?: number
  delay?: number
  staggerDelay?: number
  threshold?: number
  once?: boolean
}

const defaultConfig: TransitionConfig = {
  animationType: 'slideUp',
  duration: 0.7,
  delay: 0,
  staggerDelay: 0.1,
  threshold: 0.1,
  once: true,
}

/**
 * Hook for section scroll transitions
 * Automatically animates elements into view when they scroll into viewport
 */
export const useSectionTransition = (config: TransitionConfig = {}) => {
  const ref = useRef<HTMLDivElement>(null)
  const finalConfig = { ...defaultConfig, ...config }

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Get animation variant
    const getAnimation = (type: AnimationType) => {
      switch (type) {
        case 'fadeIn':
          return {
            from: { opacity: 0 },
            to: { opacity: 1 },
          }
        case 'slideUp':
          return {
            from: { opacity: 0, y: 40 },
            to: { opacity: 1, y: 0 },
          }
        case 'slideLeft':
          return {
            from: { opacity: 0, x: -40 },
            to: { opacity: 1, x: 0 },
          }
        case 'slideRight':
          return {
            from: { opacity: 0, x: 40 },
            to: { opacity: 1, x: 0 },
          }
        case 'scale':
          return {
            from: { opacity: 0, scale: 0.9 },
            to: { opacity: 1, scale: 1 },
          }
        case 'stagger':
          return {
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0 },
          }
        default:
          return {
            from: { opacity: 0, y: 40 },
            to: { opacity: 1, y: 0 },
          }
      }
    }

    const animation = getAnimation(finalConfig.animationType!)

    // Handle stagger animation for child elements
    if (finalConfig.animationType === 'stagger') {
      const children = element.querySelectorAll('[data-animate]')
      if (children.length > 0) {
        gsap.fromTo(children, animation.from, {
          ...animation.to,
          stagger: finalConfig.staggerDelay,
          duration: finalConfig.duration,
          ease: 'power2.out',
          delay: finalConfig.delay,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: finalConfig.once,
          },
        })
      } else {
        // Fallback: animate element itself if no children found
        gsap.fromTo(element, animation.from, {
          ...animation.to,
          duration: finalConfig.duration,
          ease: 'power2.out',
          delay: finalConfig.delay,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: finalConfig.once,
          },
        })
      }
    } else {
      // Single element animation
      gsap.fromTo(element, animation.from, {
        ...animation.to,
        duration: finalConfig.duration,
        ease: 'power2.out',
        delay: finalConfig.delay,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: finalConfig.once,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [finalConfig.animationType, finalConfig.duration])

  return ref
}

/**
 * Enhanced intersection observer for simple CSS-based animations
 * Useful for lightweight animations that don't require GSAP
 */
export const useIntersectionAnimator = (
  animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' = 'slideUp',
  once: boolean = true
) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const classMap = {
      fadeIn: 'animate-in',
      slideUp: 'animate-in',
      slideLeft: 'animate-in-left',
      slideRight: 'animate-in-right',
      scale: 'animate-in-scale',
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(classMap[animationType])
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          element.classList.remove(classMap[animationType])
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [animationType, once])

  return ref
}

/**
 * Combined hook for scroll reveal with text effect
 */
export const useScrollRevealText = (options: TransitionConfig = {}) => {
  const ref = useRef<HTMLDivElement>(null)
  const finalConfig = { ...defaultConfig, animationType: 'slideUp' as AnimationType, ...options }

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0 0)',
        duration: finalConfig.duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: finalConfig.once,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [finalConfig.duration, finalConfig.once])

  return ref
}
