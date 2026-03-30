import { useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { Chatbot } from './sections/Chatbot'
import { Footer } from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

type ThemeMode = 'dark' | 'light'

function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeMode | null
    const initialTheme = stored === 'light' ? 'light' : 'dark'
    setTheme(initialTheme)
    document.body.classList.toggle('light', initialTheme === 'light')
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)

    // Trigger fade animation on each theme switch
    document.body.classList.remove('theme-transition')
    void document.body.offsetWidth
    document.body.classList.add('theme-transition')
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-all duration-300 overflow-hidden">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
