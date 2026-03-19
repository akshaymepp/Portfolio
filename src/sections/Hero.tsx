import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 🔥 Force GPU acceleration
      gsap.set([titleRef.current, subtitleRef.current], {
        force3D: true,
        willChange: 'transform, opacity',
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Title
      tl.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
      })

      // Subtitle
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        '-=0.5'
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
        '-=0.4'
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
        <div ref={titleRef}>
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Hi, I'm Akshay
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