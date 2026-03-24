import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useSectionTransition } from '../hooks/useSectionTransition'
import 'swiper/css'

const skills = [
  { name: 'Selenium', icon: 'devicon-selenium-original' },
  { name: 'TestNG', icon: 'devicon-java-plain' },
  { name: 'Cucumber BDD', icon: 'devicon-cucumber-plain' },
  { name: 'Taiko', icon: 'devicon-nodejs-plain' },
  { name: 'JMeter', icon: 'devicon-apache-plain' },
  { name: 'Postman', icon: 'devicon-postman-plain' },
  { name: 'REST-assured', icon: 'devicon-java-plain' },
  { name: 'Swagger', icon: 'devicon-swagger-plain' },
  { name: 'Java', icon: 'devicon-java-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'SQL', icon: 'devicon-mysql-plain' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'JIRA', icon: 'devicon-jira-plain' },
  { name: 'Functional Testing', icon: 'devicon-pytest-plain' },
  { name: 'Regression Testing', icon: 'devicon-pytest-plain' },
  { name: 'API Testing', icon: 'devicon-postman-plain' },
  { name: 'Performance Testing', icon: 'devicon-apache-plain' },
]

// Duplicate skills for seamless infinite loop
const duplicatedSkills = [...skills, ...skills, ...skills]

export const Skills = () => {
  const headerRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-dark-900/50 to-dark-900 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience in quality assurance
            and test automation.
          </p>
        </div>

        {/* Skills Slider 1 - Slides Right */}
        <div className="skill-container relative w-full overflow-hidden mb-8">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
            speed={5000}
            loop={true}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 24 },
            }}
            className="w-full py-2"
          >
            {duplicatedSkills.map((skill, index) => (
              <SwiperSlide key={`skill-right-${index}`}>
                <div className="skill-card bg-transparent border border-white/15 hover:border-accent-blue/60 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 h-32 w-full">
                  <i className={`${skill.icon} colored text-5xl mb-3 transition-all duration-300 hover:scale-110`} />
                  <div className="text-sm font-poppins font-semibold text-gray-100 line-clamp-2">
                    {skill.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-20" />
        </div>

        {/* Skills Slider 2 - Slides Left */}
        <div className="skill-container relative w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
            speed={5000}
            loop={true}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 24 },
            }}
            className="w-full py-2"
          >
            {duplicatedSkills.map((skill, index) => (
              <SwiperSlide key={`skill-left-${index}`}>
                <div className="skill-card bg-transparent border border-white/15 hover:border-accent-blue/60 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 h-32 w-full">
                  <i className={`${skill.icon} colored text-5xl mb-3 transition-all duration-300 hover:scale-110`} />
                  <div className="text-sm font-poppins font-semibold text-gray-100 line-clamp-2">
                    {skill.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  )
}
