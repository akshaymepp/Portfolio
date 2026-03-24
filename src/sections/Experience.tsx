import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSectionTransition } from '../hooks/useSectionTransition'

gsap.registerPlugin(ScrollTrigger)

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })

  const experiences = [
    {
      role: 'QA Automation Engineer & Manual Tester',
      company: 'Cognizant Technology Solutions',
      period: '2023 - Present',
      description: 
      '',
      skills: ['Selenium','Java', 'TestNG', 'Cucumber', 'JMeter', 'Swagger', 'Fiddler', 'SQL', 'MongoDB', 'GitHub', 'Jenkins', 'JIRA', 'Agile','Git','Taiko', 'JavaScript', 'Manual Testing', 'UI/UX Testing','POSTMAN'],
      side: 'right',
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'Maitexa information Technology',
      period: '2022 - 2023',
      description: 
      'Completed a Full Stack MERN internship during my onboarding period at Cognizant, gaining practical experience in modern web development',
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'GitHub', 'Agile'],
      side: 'left',
    },
    {
      role: 'Education',
      company: 'St josephs Devagiri College',
      period: '2017 - 2022',
      description:
      'I completed my Bachelor of Computer Applications (BCA), during which I developed practical skills in programming, web development, and software testing, along with a solid understanding of core computer science concepts, and enhanced my problem-solving and analytical abilities through academic projects.',
        skills: [],
      side: 'left',
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      tl.to('.timeline-line', {
        height: '32px',
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.2,
      })
        .to(
          '.timeline-dot',
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            stagger: 0.2,
          },
          '-=0.4'
        )
        .to(
          '.timeline-card',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.2,
          },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-dark-900/50 to-dark-900"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg">
            My career evolution in quality assurance and test automation
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row justify-start md:justify-between items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Timeline line */}
          <div className="absolute inset-x-0 top-4 hidden md:block h-px bg-gradient-to-r from-accent-blue/50 to-accent-purple/50" />
          <div className="absolute left-1/2 md:hidden top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 to-accent-purple/50" />

          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item flex flex-col items-center flex-1 w-full md:w-auto md:max-w-xs">
              {/* Timeline dot */}
              <div
                className="timeline-dot w-8 h-8 rounded-full bg-accent-blue border-4 border-dark-900 relative z-10"
                style={{ transform: 'scale(0)' }}
              />
              {/* Timeline line */}
              <div
                className="timeline-line w-px h-8 bg-gradient-to-b from-accent-blue/50 to-accent-purple/50"
                style={{ height: '0px', transformOrigin: 'top' }}
              />
              {/* Content */}
              <div
                className="timeline-card glass-effect p-6 rounded-2xl mt-4 text-center w-full max-w-full"
                style={{
                  opacity: 0,
                  transform: 'translateY(50px)',
                }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-poppins font-bold text-accent-blue">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 font-medium">{exp.company}</p>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                  {exp.description && (
                    <p className="text-gray-400 font-medium mt-2">{exp.description}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-accent-cyan/20 text-accent-cyan rounded-full px-2 py-1 border border-accent-cyan/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
