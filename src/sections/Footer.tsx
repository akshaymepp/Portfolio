import { useRef, useEffect } from 'react'
import { useSectionTransition } from '../hooks/useSectionTransition'
import gsap from 'gsap'

export const Footer = () => {
  const footerRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })
  const socialRef = useRef<HTMLDivElement>(null)

  const socials = [
    { icon: 'devicon-linkedin-plain colored', label: 'LinkedIn', link: 'https://www.linkedin.com/in/akshay-m-7b2a69228/', isDevicon: true },
    { icon: 'https://www.naukri.com/favicon.ico', label: 'Naukri', link: 'https://www.naukri.com/mnjuser/profile?id=&altresid', isImage: true },
    { icon: 'https://img.icons8.com/?size=100&id=NdqqxfTuEK6C&format=png&color=000000', label: 'Instagram', link: 'https://www.instagram.com/akshay_crz?utm_source=qr&igsh=MWFpNDhma3hlZzk5MA==', isImage: true },
    { icon: 'https://img.icons8.com/?size=100&id=qyRpAggnV0zH&format=png&color=000000', label: 'Email', link: 'mailto:akshaykrishmepp@gmail.com', isImage: true },
  ]

  useEffect(() => {
    if (!socialRef.current) return

    const buttons = socialRef.current.querySelectorAll('.social-btn')

    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          y: -8,
          boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)',
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          y: 0,
          boxShadow: '0 0 0px rgba(0, 217, 255, 0)',
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  }, [])

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-dark-900/50 to-dark-900 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-poppins font-bold text-lg">Akshay</span>
            </div>
            <p className="text-gray-400">
              QA Engineer crafting robust test automation solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-poppins font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-accent-blue transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-poppins font-bold mb-4 text-white">Follow Me</h3>
            <div ref={socialRef} className="flex gap-4">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="social-btn w-12 h-12 rounded-lg glass-effect flex items-center justify-center text-xl hover:text-accent-blue transition-colors duration-300 group"
                >
                  {social.isDevicon ? (
                    <i className={`${social.icon} text-2xl group-hover:scale-110 transition-transform duration-300 inline-block`} />
                  ) : social.isImage ? (
                    <img src={social.icon} alt={social.label} className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent mb-8" />

        {/* Bottom */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Akshay. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Designed & built with <span className="text-accent-blue">React</span>, 
            <span className="text-accent-cyan"> Tailwind</span>, and 
            <span className="text-accent-purple"> GSAP</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
