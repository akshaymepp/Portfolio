import React, { useEffect, useRef, useState } from 'react'
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
  const resumeRef = useRef<HTMLAnchorElement>(null)
  const [colorIndex, setColorIndex] = useState(0)
  const [isDownloadingResume, setIsDownloadingResume] = useState(false)

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

      // CTA: include both buttons and anchor links (Resume)
      tl.fromTo(
        ctaRef.current?.querySelectorAll('button, a') || [],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.09,
          ease: 'power3.out',
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

  const handleResumeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (isDownloadingResume || !resumeRef.current) return

    setIsDownloadingResume(true)
    gsap.fromTo(
      resumeRef.current,
      { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
      {
        duration: 0.3,
        scale: 1.12,
        boxShadow: '0 0 20px rgba(56,189,248,0.45)',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          setIsDownloadingResume(false)
          const link = document.createElement('a')
          link.href = '/resume.docx'
          link.download = 'resume.docx'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        },
      }
    )
  }

  useEffect(() => {
    if (!resumeRef.current) return

    const el = resumeRef.current
    const onEnter = () => gsap.to(el, { duration: 0.2, scale: 1.05, backgroundColor: 'rgba(255,255,255,0.16)', ease: 'power1.out' })
    const onLeave = () => gsap.to(el, { duration: 0.2, scale: 1, backgroundColor: 'rgba(255,255,255,0.1)', ease: 'power1.inOut' })

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  

  

  return (
    <section
      id="home"
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
          <a 
            ref={resumeRef}
            href="/resume.docx"
            download="resume.docx"
            onClick={handleResumeClick}
            className={`relative z-20 inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white bg-white/10 shadow-lg shadow-cyan-500/20 rounded-lg transition-all duration-300 transform ${isDownloadingResume ? 'scale-105 bg-cyan-500/30 border-cyan-300' : 'hover:bg-white/20 hover:border-white/40 hover:scale-105'}`}
            aria-live="polite"
          >
            {isDownloadingResume ? 'Preparing Resume...' : 'Resume'}
          </a>
        </div>
      </div>
    </section>
  )
}