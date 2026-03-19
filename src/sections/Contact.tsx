import { useState, useRef } from 'react'
import { useFadeInOnScroll } from '../hooks/useAnimations'
import gsap from 'gsap'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fadeRef = useFadeInOnScroll()
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      borderColor: 'rgba(0, 217, 255, 0.8)',
      boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
    })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.currentTarget, {
      duration: 0.3,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 0px rgba(0, 217, 255, 0)',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form with animation
    gsap.to(formRef.current, {
      opacity: 0.5,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    })

    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 bg-dark-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={fadeRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Got a project in mind? Let's connect and create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="glass-effect p-8 rounded-2xl">
            <div className="text-3xl mb-4">
              📧
            </div>
            <h3 className="font-poppins font-bold mb-2 text-accent-blue">Email</h3>
            <a
              href="mailto:akshay@example.com"
              className="text-gray-300 hover:text-accent-blue transition-colors"
            >
              akshay@example.com
            </a>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <div className="text-3xl mb-4">
              📱
            </div>
            <h3 className="font-poppins font-bold mb-2 text-accent-blue">Phone</h3>
            <a
              href="tel:+919876543210"
              className="text-gray-300 hover:text-accent-blue transition-colors"
            >
              +91 (987) 654-3210
            </a>
          </div>

          <div className="glass-effect p-8 rounded-2xl">
            <div className="text-3xl mb-4">
              📍
            </div>
            <h3 className="font-poppins font-bold mb-2 text-accent-blue">Location</h3>
            <p className="text-gray-300">Pune, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-effect p-10 rounded-3xl">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none smooth-transition"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none smooth-transition"
                placeholder="your@email.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                rows={5}
                className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none smooth-transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-dark-900 font-bold text-lg hover:shadow-glow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
