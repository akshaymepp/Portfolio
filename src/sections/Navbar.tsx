import { useState, useEffect } from 'react'
import gsap from 'gsap'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)

      // Update active section based on scroll
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        scrollTo: {
          y: element,
          autoKill: false,
        },
        duration: 0.8,
        ease: 'power2.inOut',
      })
    }
  }

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/70 backdrop-blur-lg border-b border-accent-blue/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="hidden sm:block font-poppins font-bold text-lg">
              Akshay
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-sans text-sm font-medium transition-all duration-300 relative ${
                  activeSection === link.id
                    ? 'text-accent-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="glass-button hidden sm:block"
          >
            Get In Touch
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-accent-blue hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
