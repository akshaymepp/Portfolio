import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type NavbarProps = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showContactDropdown, setShowContactDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  const socials = [
    { icon: 'devicon-linkedin-plain colored', label: 'LinkedIn', link: 'https://www.linkedin.com/in/akshay-m-7b2a69228/', isDevicon: true },
    { icon: 'https://www.naukri.com/favicon.ico', label: 'Naukri', link: 'https://www.naukri.com/mnjuser/profile?id=&altresid', isImage: true },
    { icon: 'https://img.icons8.com/?size=100&id=NdqqxfTuEK6C&format=png&color=000000', label: 'Instagram', link: 'https://www.instagram.com/akshay_crz?utm_source=qr&igsh=MWFpNDhma3hlZzk5MA==', isImage: true },
    { icon: 'https://img.icons8.com/?size=100&id=qyRpAggnV0zH&format=png&color=000000', label: 'Gmail', link: 'mailto:akshaykrishmepp@gmail.com', isImage: true },
  ]

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ]

  const sections = navLinks.map((link) => link.id)

  // Handle URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1) || 'home'
    if (sections.includes(hash)) {
      setActiveSection(hash)
      scrollToSection(hash, true)
    }
  }, [])

  // Handle scroll events with debounce to prevent flickering
  useEffect(() => {
    let scrollTimeout: number | undefined

    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(scrollTimeout)

      // Update active section based on scroll
      if (!isScrollingRef.current) {
        const navHeight = 80 // navbar height
        let closestSection = activeSection
        let closestDistance = Infinity

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // Distance from top of viewport to section top
            const distance = Math.abs(rect.top - navHeight)
            
            // If section is in upper half of viewport, it's the active one
            if (rect.top <= navHeight + 100 && rect.bottom > navHeight && distance < closestDistance) {
              closestDistance = distance
              closestSection = section
            }
          }
        }

        // Only update if section actually changed
        if (closestSection !== activeSection) {
          setActiveSection(closestSection)
          // Update URL without causing scroll jump
          window.history.replaceState(null, '', `#${closestSection}`)
        }
      }

      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      // hide mobile menu/dropdown while scrolling
      if (isMobileMenuOpen || showContactDropdown || isMobileContactOpen) {
        setIsMobileMenuOpen(false)
        setShowContactDropdown(false)
        setIsMobileContactOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeSection, sections])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowContactDropdown(false)
      }
    }

    if (showContactDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showContactDropdown])

  const scrollToSection = (sectionId: string, isInitial = false) => {
    const element = document.getElementById(sectionId)
    if (element) {
      isScrollingRef.current = true
      setShowContactDropdown(false)
      setIsMobileMenuOpen(false)

      // Update URL with pushState when user clicks
      if (!isInitial) {
        window.history.pushState(null, '', `#${sectionId}`)
        setActiveSection(sectionId)
      }

      gsap.to(window, {
        scrollTo: {
          y: element,
          autoKill: false,
          offsetY: 80, // navbar height offset
        },
        duration: 0.1,
        ease: 'power1.inOut',
        onComplete: () => {
          isScrollingRef.current = false
          // Ensure active section is set after scroll completes
          setActiveSection(sectionId)
          window.history.replaceState(null, '', `#${sectionId}`)
        },
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? theme === 'light'
            ? 'bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg'
            : 'bg-dark-900/80 backdrop-blur-lg border-b border-accent-blue/20 shadow-lg shadow-accent-blue/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group hover:opacity-80 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-accent-blue/50 transition-all duration-300">
              A
            </div>
            <span className="hidden md:block font-poppins font-semibold text-base lg:text-lg group-hover:text-accent-blue transition-colors duration-300">
              Akshay
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-sans text-[11px] lg:text-sm font-medium relative group whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-accent-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full" />
                )}
                {activeSection !== link.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full w-0 group-hover:w-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 relative shrink-0" ref={dropdownRef}>
            {/* ON/OFF Toggle Switch */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="relative inline-flex h-8 w-[66px] lg:h-10 lg:w-20 items-center rounded-full transition-all duration-700 ease-in-out cursor-pointer focus:outline-none overflow-hidden"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 200, 100, 0.15)',
                border: `2px solid ${theme === 'dark' ? 'rgba(0, 217, 255, 0.5)' : 'rgba(0, 0, 0, 0.7)'}`,
              }}
            >
              {/* Background labels */}
              <span className="absolute left-2 text-[9px] lg:left-2.5 lg:text-xs font-bold text-gray-500">ON</span>
              <span className="absolute right-2 text-[9px] lg:right-2.5 lg:text-xs font-bold text-gray-500">OFF</span>

              {/* Toggle circle */}
              <div
                className="absolute h-6 w-6 lg:h-9 lg:w-9 rounded-full transition-all duration-700 ease-in-out flex items-center justify-center text-xs lg:text-lg z-10"
                style={{
                  left: theme === 'dark' ? '2px' : '32px',
                  backgroundColor: theme === 'dark' ? '#00d9ff' : '#ffc864',
                  boxShadow: theme === 'dark' ? '0 0 15px rgba(0, 217, 255, 0.8)' : '0 0 15px rgba(255, 200, 100, 0.8)',
                  transform: 'scale(1)',
                }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </div>
            </button>

            <button
              onClick={() => setShowContactDropdown(!showContactDropdown)}
              className={`glass-button px-3 py-2 lg:px-5 lg:py-3 text-xs lg:text-sm hover:scale-105 active:scale-95 transition-transform duration-300 z-40 whitespace-nowrap ${
                theme === 'light' ? 'light-contact-trigger' : ''
              }`}
            >
              Get In Touch
            </button>

            {/* Dropdown Menu */}
            {showContactDropdown && (
              <div className={`absolute right-0 top-full mt-2 w-56 backdrop-blur-sm border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-500 z-50 ${
                theme === 'light'
                  ? 'light-contact-dropdown bg-white/95 border-white/20'
                  : 'bg-dark-800/95 border-accent-blue/30'
              }`}>
                <div className={`p-4 border-b ${
                  theme === 'light'
                    ? 'border-white/20 bg-gradient-to-r from-yellow-100/80 to-yellow-50/90'
                    : 'border-accent-blue/20 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10'
                }`}>
                  <p className="text-sm text-gray-300 font-semibold">Connect With Me</p>
                </div>
                <div className="p-3 space-y-2">
                  {socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg group transform hover:translate-x-1 transition-all duration-300 ${
                        theme === 'light'
                          ? 'light-contact-link bg-yellow-50/70 hover:bg-yellow-100/90'
                          : 'bg-dark-800/30 hover:bg-accent-blue/15'
                      }`}
                      style={{
                        animation: `slideInRight 0.5s ease-out ${idx * 0.08}s both`,
                      }}
                    >
                      {social.isDevicon ? (
                        <i className={`${social.icon} text-lg group-hover:scale-110 transition-transform duration-300`} />
                      ) : social.isImage ? (
                        <img src={social.icon} alt={social.label} className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      ) : null}
                      <span className="text-sm text-gray-300 group-hover:text-accent-blue transition-colors duration-300">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="relative inline-flex h-9 w-[72px] items-center rounded-full transition-all duration-700 ease-in-out cursor-pointer focus:outline-none overflow-hidden"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 200, 100, 0.15)',
                border: `2px solid ${theme === 'dark' ? 'rgba(0, 217, 255, 0.5)' : 'rgba(0, 0, 0, 0.7)'}`,
              }}
            >
              <span className="absolute left-2 text-[10px] font-bold text-gray-500">ON</span>
              <span className="absolute right-2 text-[10px] font-bold text-gray-500">OFF</span>
              <div
                className={`absolute left-[2px] h-7 w-7 rounded-full transition-transform duration-700 ease-in-out flex items-center justify-center text-sm z-10 ${
                  theme === 'dark' ? 'translate-x-0' : 'translate-x-[38px]'
                }`}
                style={{
                  backgroundColor: theme === 'dark' ? '#00d9ff' : '#ffc864',
                  boxShadow: theme === 'dark' ? '0 0 15px rgba(0, 217, 255, 0.8)' : '0 0 15px rgba(255, 200, 100, 0.8)',
                }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </div>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile navigation"
              aria-expanded={isMobileMenuOpen}
              className={`text-accent-blue hover:text-white transition duration-300 transform ${isMobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out / dropdown menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-lg border-t shadow-lg transform transition-all duration-300 ease-in-out opacity-100 translate-y-0 pointer-events-auto ${
          theme === 'light'
            ? 'bg-white/95 border-white/20'
            : 'bg-dark-900/95 border-accent-blue/20'
        }`}>
          <div className="flex flex-col gap-2 p-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left w-full px-2 py-1 rounded-lg text-xs font-medium ${
                  activeSection === link.id
                    ? 'text-accent-blue'
                    : theme === 'light'
                      ? 'text-[var(--text-color)] hover:text-accent-blue'
                      : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
              <button
              onClick={() => {
                setIsMobileContactOpen((prev) => !prev)
                setShowContactDropdown(false)
              }}
              className={`text-center min-w-[72px] px-2 py-1 text-xs rounded-lg border sm:hidden ${
                theme === 'light'
                  ? 'bg-white text-[var(--text-color)] border-white/20 hover:bg-yellow-50'
                  : 'text-gray-300 hover:text-white border-accent-blue/20'
              }`}
            >
              Get In Touch
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isMobileContactOpen ? 'max-h-56 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="flex flex-wrap gap-2 justify-center items-center">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                      theme === 'light'
                        ? 'bg-yellow-50/90 hover:bg-yellow-100 text-[var(--text-color)]'
                        : 'bg-dark-800/80 hover:bg-accent-blue/20 text-gray-200'
                    }`}
                  >
                    {social.isDevicon ? (
                      <i className={`${social.icon} text-sm`} />
                    ) : social.isImage ? (
                      <img src={social.icon} alt={social.label} className="w-4 h-4" />
                    ) : null}
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smooth Transition Keyframes */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  )
}
