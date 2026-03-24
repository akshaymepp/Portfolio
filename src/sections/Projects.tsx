import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSectionTransition } from '../hooks/useSectionTransition'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Travelers',
    type: 'Insurance Domain Project',
    description:
      'Travelers is one of the leading providers of property and casualty insurance in the United States, serving a wide range of personal, business, and specialty insurance needs. Headquartered in New York and operating for over 165 years, Travelers is renowned for its innovation, customer-centric approach, and strong presence in the insurance industry. Travelers offers comprehensive insurance products',
    link: 'https://www.travelers.com/',
    image: '/images/2dd26e023a8c3cc881feedb032a4ae6c.jpg',

  },
  {
    title: 'LexisNexis',
    type: 'Legal & Professional Information Project',
    description:
      'LexisNexis Legal Research Solutions is a leading global provider of legal, regulatory, and business information services, helping legal professionals conduct accurate research and make informed decisions. The platform offers advanced legal research tools, case law databases, and analytics to support litigation, compliance, and legal operations. Known for innovation in legal tech',

    link: 'https://www.lexisnexis.com/',
    image: '/images/2153602.jpg',
  },
]

console.log(projects[0].link)

export const Projects = () => {
  const headerRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    // Set initial visible state on all cards
    const cards = containerRef.current.querySelectorAll('article')
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 })

    const ctx = gsap.context(() => {
      // Parallax background subtle drift
      gsap.to(sectionRef.current, {
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Select all cards from DOM
      const allCards = containerRef.current?.querySelectorAll('article') || []

      allCards.forEach((card) => {
        const title = card.querySelector('.project-title')
        const subtitle = card.querySelector('.project-type')
        const copy = card.querySelector('.project-copy')
        const tags = card.querySelectorAll('.project-tag')
        const details = card.querySelector('.project-details')

        if (!title || !subtitle || !copy || !details) return

        // Create staggered animations on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        })

        tl.from(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.98,
            duration: 0.75,
            ease: 'power3.out',
          },
          0
        )
          .from([title, subtitle, copy], { opacity: 0, y: 20, stagger: 0.12, duration: 0.35 }, 0.1)
          .from(tags, { opacity: 0, y: 12, stagger: 0.08, duration: 0.3 }, 0.35)
          .from(details, { opacity: 0, x: -20, duration: 0.35 }, 0.55)

        // Hover effects
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.03,
            boxShadow: '0 20px 50px rgba(79, 70, 229, 0.45)',
            duration: 0.35,
            ease: 'power1.out',
          })

          const hoverEl = card.querySelector('.project-hover')
          if (hoverEl) {
            gsap.to(hoverEl, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: 'power1.out',
            })
          }
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            duration: 0.35,
            ease: 'power1.out',
          })

          const hoverEl = card.querySelector('.project-hover')
          if (hoverEl) {
            gsap.to(hoverEl, {
              opacity: 0,
              y: 10,
              duration: 0.2,
              ease: 'power1.out',
            })
          }
        })
      })

      // Refresh to catch any cards already in viewport
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{ backgroundColor: '#06070a' }}
    >
      {/* gradient blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3">
            Projects
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
            Hands-on projects I’ve worked on
          </p>
        </div>

        <div ref={containerRef} className="space-y-5">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-300 min-h-[50px]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/20 via-indigo-500/15 to-purple-500/20 pointer-events-none pointer-events-none pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-6 p-8 lg:p-10 lg:items-center">
                <div className="flex-shrink-0 h-50 w-60 rounded-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} logo`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <p className="project-type text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
                    {project.type}
                  </p>
                  <h3 className="project-title text-2xl md:text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="project-copy text-slate-300 leading-relaxed">
                    {project.description}
                  </p>



                  <div className="mt-4">
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-100 transition-all duration-300"
                    >
                      View Details
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 rounded-full bg-cyan-400/20 px-4 py-2 text-xs text-cyan-100 opacity-0 translate-y-4 transition-all duration-300 pointer-events-none">
                View Details →
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-10 left-1/2 h-1 w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/70 via-indigo-500/50 to-purple-400/70 blur-xl" />
    </section>
  )
}
