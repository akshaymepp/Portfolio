import { useState, useRef, useEffect } from 'react'
import { useSectionTransition } from '../hooks/useSectionTransition'
import gsap from 'gsap'
import emailjs from '@emailjs/browser'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [submitStatus, setSubmitStatus] = useState<{ type: string; message: string } | null>(null)
  const headerRef = useSectionTransition({ animationType: 'slideUp', duration: 0.8 })
  const formRef = useRef<HTMLFormElement>(null)

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('DnhvEzxli1NIfcNHO')
  }, [])

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

  const validateForm = () => {
    const newErrors: typeof errors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus(null)

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_04pdm4s',
        'template_cx64ijf',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      )

      if (response.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.',
        })

        // Reset form with animation
        gsap.to(formRef.current, {
          opacity: 0.5,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        })

        setFormData({ name: '', email: '', message: '' })
        setErrors({})
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-dark-900 to-dark-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Got a project in mind? Let's connect and create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="glass-effect p-8 rounded-2xl min-h-[180px] flex flex-col">
            <div className="text-3xl mb-4">
              📧
            </div>
            <h3 className="font-poppins font-bold mb-2 text-accent-blue">Email</h3>
            <a
              href="mailto:akshaykrishmepp@gmail.com"
              className="text-gray-300 hover:text-accent-blue transition-colors whitespace-nowrap text-sm"
            >
              akshaykrishmepp@gmail.com
            </a>
          </div>

          <div className="glass-effect p-8 rounded-2xl min-h-[180px] flex flex-col">
            <div className="text-3xl mb-4">
              📱
            </div>
            <h3 className="font-poppins font-bold mb-2 text-accent-blue">Phone</h3>
            <a
              href="tel:+919495805611"
              className="text-gray-300 hover:text-accent-blue transition-colors text-sm"
            >
              +91 9495805611
            </a>
          </div>

          <div className="glass-effect p-8 rounded-2xl min-h-[180px] flex flex-col">
            <div className="text-3xl mb-4">
              📍
            </div>
            <h3 className="font-poppins font-bold mb-2 text-accent-blue">Location</h3>
            <p className="text-gray-300 text-sm">Kerala, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-effect p-10 rounded-3xl">
          {submitStatus && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                  : 'bg-red-500/20 border border-red-500/50 text-red-300'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

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
                className={`w-full px-6 py-3 rounded-lg bg-white/5 border ${
                  errors.name ? 'border-red-500/50' : 'border-white/10'
                } text-white placeholder-gray-500 focus:outline-none smooth-transition`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
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
                className={`w-full px-6 py-3 rounded-lg bg-white/5 border ${
                  errors.email ? 'border-red-500/50' : 'border-white/10'
                } text-white placeholder-gray-500 focus:outline-none smooth-transition`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
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
                className={`w-full px-6 py-3 rounded-lg bg-white/5 border ${
                  errors.message ? 'border-red-500/50' : 'border-white/10'
                } text-white placeholder-gray-500 focus:outline-none smooth-transition resize-none`}
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
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
