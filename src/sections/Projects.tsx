import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSectionTransition } from '../hooks/useSectionTransition'

gsap.registerPlugin(ScrollTrigger)

export const Projects = () => {
  const headerRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const projects = [
    {
      title: 'The Travelers Company',
      description:
        'Enterprise insurance platform test automation with 95%+ coverage across regression, smoke, and functional testing.',
      image: '🏢',
      tech: ['Selenium', 'Java', 'TestNG', 'Cucumber', 'JMeter'],
      link: '#',
    },
    {
      title: 'API Testing & Validation',
      description:
        'Comprehensive API testing suite validating RESTful services, HTTP traffic analysis, and backend data consistency.',
      image: '🔌',
      tech: ['JMeter', 'Swagger', 'Fiddler', 'SQL', 'REST-assured'],
      link: '#',
    },
    {
      title: 'LexisNexis Platform',
      description:
        'Legal research solution automation using Taiko & JavaScript with end-to-end testing for complex workflows.',
      image: '⚖️',
      tech: ['Taiko', 'JavaScript', 'Manual Testing', 'UI Testing'],
      link: '#',
    },
    {
      title: 'Mobile Test Framework',
      description:
        'Cross-platform mobile automation framework supporting iOS and Android with Appium integration.',
      image: '📱',
      tech: ['Appium', 'Mobile Testing', 'TestNG', 'CI/CD'],
      link: '#',
    },
    {
      title: 'Performance Testing',
      description:
        'Load and stress testing implementation identifying bottlenecks and optimizing application performance.',
      image: '⚡',
      tech: ['LoadRunner', 'JMeter', 'Grafana', 'Performance Analysis'],
      link: '#',
    },
    {
      title: 'Test Data Management',
      description:
        'Automated test data generation and cleanup scripts ensuring data integrity across test environments.',
      image: '💾',
      tech: ['SQL', 'MongoDB', 'Python', 'Database Management'],
      link: '#',
    },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    // Stagger animation for cards
    cardsRef.current.forEach((card) => {
      if (!card) return

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          boxShadow: '0 0 60px rgba(0, 217, 255, 0.4)',
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(card.querySelector('.project-overlay'), {
          opacity: 1,
          duration: 0.3,
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 0 30px rgba(0, 217, 255, 0)',
          duration: 0.3,
          ease: 'power2.out',
        })

        gsap.to(card.querySelector('.project-overlay'), {
          opacity: 0,
          duration: 0.3,
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-dark-900 to-dark-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of QA automation and testing solutions I've built and deployed across
            various platforms and technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el
              }}
              className="glass-effect rounded-2xl overflow-hidden group cursor-pointer relative"
            >
              {/* Project Image/Icon Area */}
              <div className="h-48 bg-gradient-to-br from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20 flex items-center justify-center text-7xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-poppins font-bold mb-3 group-hover:text-accent-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-accent-blue/20 text-accent-blue rounded-full px-3 py-1 border border-accent-blue/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="flex-1 text-center py-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/40 transition-colors duration-300 text-sm font-medium"
                  >
                    View Project
                  </a>
                  <a
                    href={project.link}
                    className="flex-1 text-center py-2 rounded-lg border border-accent-blue/30 text-gray-300 hover:border-accent-blue/70 hover:text-accent-blue transition-colors duration-300 text-sm font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Overlay */}
              <div className="project-overlay absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 pointer-events-none opacity-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
