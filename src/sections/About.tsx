import { useTypingAnimation } from '../hooks/useAnimations'
import { useSectionTransition } from '../hooks/useSectionTransition'

export const About = () => {
  const fadeRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })
  
  const whatIDoContent = `Collaborated closely with stakeholders and cross-functional teams in an Agile environment to understand requirements and ensure comprehensive test coverage for insurance applications.

Performed both manual and automation testing to validate functional and non-functional requirements across web-based and API-driven applications.

Developed and maintained automation scripts using Selenium with Java and Taiko with JavaScript to support regression, smoke, and integration testing.

Conducted API testing to validate request/response structures, authentication mechanisms, and data accuracy using tools like Postman and REST-assured.

Executed performance testing scenarios to assess system behavior under load and identify bottlenecks affecting application speed and reliability.

Actively participated in Agile ceremonies including sprint planning, daily stand-ups, and retrospectives, contributing to sprint deliverables and continuous improvement.

Logged, tracked, and prioritized defects using JIRA, and collaborated with developers to ensure timely resolution.

Created and maintained reusable test cases, test data, and test plans based on user stories and acceptance criteria.

Worked with CI/CD pipelines to integrate automated test scripts into the build process, ensuring faster feedback and early bug detection.

Provided regular test reports, bug analysis, and QA sign-offs to support release readiness and maintain high quality deliverables.`
  
  const { ref: whatIDoRef, displayedText: whatIDoText } = useTypingAnimation(whatIDoContent, 35)


  return (
    <section id="about" className="py-24 bg-gradient-to-b from-dark-900 to-dark-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={fadeRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left - What I Do Section */}
          <div className="glass-effect p-8 rounded-3xl transition-all duration-300 hover:bg-white/15 hover:border-accent-cyan/50 hover:shadow-lg">
            <h3 className="text-lg font-poppins font-bold mb-4 text-accent-blue">
              What I Do
            </h3>
            <div 
              ref={whatIDoRef}
              className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans overflow-y-auto hide-scrollbar antialiased"
              style={{
                height: '400px',
                WebkitFontSmoothing: 'antialiased',
                letterSpacing: '0.3px'
              } as React.CSSProperties}
            >
              {whatIDoText}
              <span className="animate-pulse ml-1">|</span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
                About <span className="gradient-text">Me</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Software Test Engineer with 3+ years of experience in automation and manual testing within the insurance domain and 
                specializing in API testing, integration testing, regression testing, and performance testing. Proficient in using 
                Selenium with Java and Taiko with JavaScript to build robust and maintainable test automation frameworks. Skilled 
in identifying issues early in the development lifecycle and ensuring high-quality software delivery through efficient 
and reliable testing practices.Experienced in designing scalable test strategies, improving test coverage, and reducing execution time through optimized automation solutions. Strong hands-on experience with tools like Postman, REST-assured, and JMeter for API and performance validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
