import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const skills = [
  { name: 'Selenium WebDriver', icon: '🧪' },
  { name: 'TestNG', icon: '📊' },
  { name: 'Cucumber BDD', icon: '🥒' },
  { name: 'Taiko', icon: '🌊' },
  { name: 'Appium', icon: '📱' },
  { name: 'JMeter', icon: '⚡' },
  { name: 'Postman', icon: '📮' },
  { name: 'REST-assured', icon: '🔗' },
  { name: 'Swagger', icon: '📘' },
  { name: 'LoadRunner', icon: '🏃' },
  { name: 'Java', icon: '☕' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Git', icon: '🔧' },
  { name: 'JIRA', icon: '📌' },
  { name: 'Functional Testing', icon: '✅' },
  { name: 'Regression Testing', icon: '🔁' },
  { name: 'API Testing', icon: '🌐' },
  { name: 'Performance Testing', icon: '🚀' },
]

// original order + reversed order for duplicate slide set
const skillsWithReverse = [...skills, ...[...skills].reverse()]

export const Skills = () => {

  return (
    <section id="skills" className="py-24 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience in quality assurance
            and test automation.
          </p>
        </div>

        {/* Skills Slider (Swiper) */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          loop
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="py-2 p-relative"
        >
          {skillsWithReverse.slice(0, 7).map((skill, index) => (
            <SwiperSlide key={`${skill.name}-${index}`}>
              <div className="bg-transparent   p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ">
                {skill.name === 'TestNG' ? (
                  <img
                    src="/images/TestNG-Framework-Tutorial.webp"
                    alt="TestNG"
                    className="w-20 h-20 object-contain mb-2"
                  />
                ) : (
                  <>
                    <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <div className="text-sm font-poppins font-semibold text-gray-100">
                      {skill.name}
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}

          <div className="absolute top-0 left-0 w-[100px] z-10 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[100px] z-10 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </Swiper>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          loop
          slidesPerView={2}
          spaceBetween={16}
          dir='rtl'
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="py-2 p-relative"
        >
          {skillsWithReverse.slice(0, 7).map((skill, index) => (
            <SwiperSlide key={`${skill.name}-${index}`}>
              <div className="bg-transparent   p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] ">
                {skill.name === 'TestNG' ? (
                  <img
                    src="/images/TestNG-Framework-Tutorial.webp"
                    alt="TestNG"
                    className="w-20 h-20 object-contain mb-2"
                  />
                ) : (
                  <>
                    <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <div className="text-sm font-poppins font-semibold text-gray-100">
                      {skill.name}
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}

          <div className="absolute top-0 left-0 w-[100px] z-10 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[100px] z-10 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </Swiper>

      </div>
    </section>
  )
}
