import { useFadeInOnScroll } from '../hooks/useAnimations'

export const Experience = () => {
  const fadeRef = useFadeInOnScroll()

  const experiences = [
    {
      role: 'Senior QA Test Engineer',
      company: 'The Travelers Company',
      period: '2023 - Present',
      description:
        'Led automation framework architecture and maintained test suites covering critical business logic. Improved test execution time by 40% through optimization.',
      skills: ['Selenium', 'Java', 'TestNG', 'CI/CD'],
      side: 'right',
    },
    {
      role: 'QA Automation Engineer',
      company: 'LexisNexis',
      period: '2021 - 2023',
      description:
        'Developed and maintained comprehensive test automation scripts using Taiko and JavaScript. Achieved 95% automation coverage.',
      skills: ['Taiko', 'JavaScript', 'API Testing'],
      side: 'left',
    },
    {
      role: 'Junior QA Engineer',
      company: 'Tech Startup',
      period: '2020 - 2021',
      description:
        'Performed manual and automated testing across web and mobile platforms. Implemented basic test automation scripts.',
      skills: ['Manual Testing', 'Selenium', 'Postman'],
      side: 'right',
    },
  ]

  return (
    <section id="experience" className="py-24 bg-dark-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg">
            My career evolution in quality assurance and test automation
          </p>
        </div>

        {/* Timeline */}
        <div ref={fadeRef} className="space-y-12 relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 to-accent-purple/50" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                idx % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex justify-center">
                <div className="min-w-8 w-8 h-8 rounded-full bg-accent-blue border-4 border-dark-900 relative z-10" />
              </div>

              {/* Content */}
              <div className="glass-effect p-8 rounded-2xl md:w-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-accent-blue">
                      {exp.role}
                    </h3>
                    <p className="text-gray-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-accent-cyan/20 text-accent-cyan rounded-full px-3 py-1 border border-accent-cyan/30"
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
