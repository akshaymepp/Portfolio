import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    gsap.registerPlugin(ScrollTrigger)

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
