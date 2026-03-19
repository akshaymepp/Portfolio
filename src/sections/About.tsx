import { useFadeInOnScroll } from '../hooks/useAnimations'

export const About = () => {
  const fadeRef = useFadeInOnScroll()

  return (
    <section id="about" className="py-24 bg-dark-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={fadeRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="glass-effect p-8 rounded-3xl">
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-transparent to-accent-purple/30 opacity-50" />
              <div className="flex items-center justify-center h-full">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
                About <span className="gradient-text">Me</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a Software Quality Engineer with 3+ years of experience in test automation
                and quality assurance. I specialize in building scalable automation frameworks
                that catch bugs before they reach production.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-poppins font-bold mb-4 text-accent-blue">
                What I Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent-cyan flex-shrink-0 mt-1">→</span>
                  <span className="text-gray-300">
                    Design robust test automation frameworks using Selenium & Java
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-cyan flex-shrink-0 mt-1">→</span>
                  <span className="text-gray-300">
                    Perform comprehensive API testing with JMeter & Postman
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-cyan flex-shrink-0 mt-1">→</span>
                  <span className="text-gray-300">
                    Implement CI/CD testing pipelines with Jenkins & GitHub Actions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-cyan flex-shrink-0 mt-1">→</span>
                  <span className="text-gray-300">
                    Build test reports & dashboards for stakeholder communication
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
