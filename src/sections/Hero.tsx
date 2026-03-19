import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLOR_GRADIENTS = [
  { from: '#06B6D4', to: '#3B82F6' },     // cyan to blue
  { from: '#A855F7', to: '#EC4899' },     // purple to pink
  { from: '#10B981', to: '#06B6D4' },     // green to cyan
  { from: '#F97316', to: '#EF4444' },     // orange to red
  { from: '#3B82F6', to: '#A855F7' },     // blue to purple
]

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const hiRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const akshayRef = useRef<HTMLSpanElement>(null)
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 🔥 Force GPU acceleration
      gsap.set([hiRef.current, titleRef.current, subtitleRef.current], {
        force3D: true,
        willChange: 'transform, opacity',
      })

      const tl = gsap.timeline({
        defaults: { ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
      })

      // "Hi" - Apple-style animation (plays first)
      tl.from(hiRef.current, {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.5,
        y: 40,
        duration: 1.2,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }, 0)

      // Title - starts after "Hi" completes
      tl.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
      }, 1.2)

      // Subtitle
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        1.5
      )

      // CTA
      tl.from(
        ctaRef.current?.querySelectorAll('button') || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.12,
        },
        1.8
      )

      // 🚀 PARALLAX FIX (transform instead of backgroundPosition)
      gsap.to(bgRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 🎨 Smooth color transition for Akshay text
  useEffect(() => {
    if (!akshayRef.current) return

    const animateGradient = () => {
      const nextColorIndex = (colorIndex + 1) % COLOR_GRADIENTS.length
      const nextColor = COLOR_GRADIENTS[nextColorIndex]

      // Animate gradient change smoothly
      gsap.to(akshayRef.current, {
        duration: 2,
        backgroundImage: `linear-gradient(to right, ${nextColor.from}, ${nextColor.to})`,
        ease: 'none',
        onComplete: () => {
          setColorIndex(nextColorIndex)
        },
      })
    }

    const interval = setInterval(animateGradient, 3000)
    animateGradient() // Initial animation

    return () => clearInterval(interval)
  }, [colorIndex])

  

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ✅ Parallax Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.15), transparent 60%)',
        }}
      />

      {/* ⚠️ REMOVE heavy blur animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* "Hi" with Apple-style animation */}
        <div ref={hiRef} className="mb-4">
          <p className="text-3xl md:text-4xl font-medium bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Hi
          </p>
        </div>

        <div ref={titleRef}>
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-white">I'm </span>
            <span
              ref={akshayRef}
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${COLOR_GRADIENTS[colorIndex].from}, ${COLOR_GRADIENTS[colorIndex].to})`,
              }}
            >
              Akshay
            </span>
            <br />
            <span className="text-white">
              Software Quality Engineer
            </span>
          </h1>
        </div>

        <div ref={subtitleRef} className="mt-6">
          <p className="text-gray-300 max-w-xl mx-auto">
            I craft scalable automation frameworks and ensure software excellence.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="mt-8 flex gap-4 justify-center flex-wrap"
        >
          <button className="px-6 py-3 bg-cyan-400 text-black rounded-lg">
            View Work
          </button>
          <button className="px-6 py-3 border border-white/20 text-white rounded-lg">
            Resume
          </button>
        </div>
      </div>
    </section>
  )
}