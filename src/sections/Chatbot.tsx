import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type Message = {
  id: number
  role: 'user' | 'bot'
  text: string
}

type Suggestion = {
  keyword: string
  similarity: number
  type: 'exact' | 'close' | 'partial'
}

// ============================================
// KEYWORD MATCHING & TYPO CORRECTION SYSTEM
// ============================================

const PORTFOLIO_KEYWORDS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
  'resume',
  'education',
  'certifications',
  'email',
  'phone',
  'call',
  'portfolio',
  'work',
  'project',
  'certification',
  'course',
  'automation',
  'selenium',
  'taiko',
  'api',
  'performance',
  'jmeter',
  'travelers',
  'lexisnexis',
]

/**
 * Calculate Levenshtein distance between two strings
 * Measures minimum edits (insertions, deletions, substitutions) needed
 * @param str1 First string
 * @param str2 Second string
 * @returns Levenshtein distance number
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(0))

  for (let i = 0; i <= str1.length; i++) track[0][i] = i
  for (let j = 0; j <= str2.length; j++) track[j][0] = j

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      )
    }
  }

  return track[str2.length][str1.length]
}

/**
 * Calculate similarity score between two strings (0 to 1)
 * @param str1 First string
 * @param str2 Second string
 * @returns Similarity score
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const maxLen = Math.max(str1.length, str2.length)
  if (maxLen === 0) return 1
  const distance = levenshteinDistance(str1, str2)
  return 1 - distance / maxLen
}

/**
 * Find suggestions based on user input with fuzzy matching
 * @param input User typed text
 * @param threshold Minimum similarity (0-1)
 * @returns Array of suggestions sorted by similarity
 */
const findSuggestions = (input: string, threshold = 0.4): Suggestion[] => {
  if (input.length === 0) return []

  const suggestions: Suggestion[] = []

  PORTFOLIO_KEYWORDS.forEach((keyword) => {
    const similarity = calculateSimilarity(input.toLowerCase(), keyword.toLowerCase())

    // Exact match
    if (keyword.toLowerCase() === input.toLowerCase()) {
      suggestions.push({ keyword, similarity: 1, type: 'exact' })
      return
    }

    // Partial match (prefix)
    if (keyword.toLowerCase().startsWith(input.toLowerCase())) {
      suggestions.push({ keyword, similarity: Math.max(similarity, 0.8), type: 'partial' })
      return
    }

    // Close match (typo)
    if (similarity >= threshold) {
      suggestions.push({ keyword, similarity, type: 'close' })
    }
  })

  // Sort by similarity (highest first)
  return suggestions.sort((a, b) => b.similarity - a.similarity).slice(0, 3)
}

/**
 * Get best suggestion if available
 * @param input User typed text
 * @returns Best suggestion or null
 */
const getBestSuggestion = (input: string): Suggestion | null => {
  const suggestions = findSuggestions(input)
  return suggestions.length > 0 ? suggestions[0] : null
}

const getBotResponse = (input: string) => {
  const text = input.trim().toLowerCase()

  if (!text) return 'Please type a message so I can help you.'
  
  if (text.includes('hi') || text.includes('hello')) {
    return 'Hello! I am your portfolio assistant. You can ask about skills, projects, experience, or how to contact me.'
  }
  
  if (text.includes('about') || text.includes('summary') || text.includes('objective')) {
    return 'I am a Software Test Engineer with 3 years of experience in automation and manual testing within the insurance domain. I specialize in API testing, integration testing, regression testing, and performance testing. I am proficient in Selenium with Java and Taiko with JavaScript, building robust and maintainable test automation frameworks.'
  }
  
  if (text.includes('experience') || text.includes('work')) {
    return 'I currently work as an Automation Tester at Cognizant Information Technologies in Kochi, Kerala. I collaborate with stakeholders in Agile environments, perform manual and automation testing, develop test scripts using Selenium and Taiko, conduct API testing with Postman, execute performance testing with JMeter, and integrate automated tests into CI/CD pipelines using Jenkins and GitHub.'
  }
  
  if (text.includes('education') || text.includes('certification') || text.includes('course')) {
    return 'I completed my Bachelor of Computer Applications (BCA) from St Joseph\'s College, Devagiri (2019-2022) with a CGPA of 82.75%. I also completed Higher Secondary Education from Zamorin\'s Higher Secondary School, Calicut (2017-2019) with 80%.'
  }
  
  if (text.includes('project') || text.includes('travelers') || text.includes('lexisnexis')) {
    return 'I have worked on major projects: 1) The Travelers Company - A Fortune 500 insurance provider where I designed Selenium frameworks, performed API testing with JMeter, conducted performance testing, and integrated tests with CI/CD. 2) LexisNexis - Where I performed smoke and regression testing, developed Taiko automation scripts, and maintained comprehensive test documentation.'
  }
  
  if (text.includes('automation') || text.includes('selenium') || text.includes('taiko')) {
    return 'I specialize in test automation using Selenium with Java and Taiko with JavaScript. I design robust frameworks with Maven, TestNG, and Cucumber for BDD-style testing. I handle regression, smoke, and functional testing across multiple browsers and platforms.'
  }
  
  if (text.includes('api') || text.includes('performance') || text.includes('jmeter')) {
    return 'I perform comprehensive API testing using Postman, Swagger, and REST-assured. For performance testing, I use JMeter to evaluate system load handling and optimize application performance. I also use Fiddler for deep-level HTTP traffic analysis.'
  }
  
  if (text.includes('skills')) {
    return 'I have strong technical expertise in Selenium, Taiko, JMeter, Maven, TestNG, Cucumber, SQL, Java, JavaScript, Robo3T, Fiddler, Swagger, GitHub, Jenkins, and Jira, complemented by solid soft skills including effective communication, teamwork, time management, quick learning ability, and problem-solving.'
  }
  
  if (text === 'email' || text === 'Gmail') {
    return 'My email is akshaykrishmepp@gmail.com. Feel free to reach out anytime!'
  }
  
  if (text === 'phone' || text === 'number' || text=='call') {
    return 'My phone number is 9495805611. Call or message me whenever you need.'
  }
  
  if (text.includes('projects') || text.includes('portfolio')) {
    return 'Check out the Projects section in the page to review live examples of my work, including test automation and web apps.'
  }
  
  if (text.includes('contact')) {
    return 'I can provide you with my contact information. Please let me know if you prefer email or phone.'
  }
  
  if (text.includes('resume')) {
    return 'Download the resume button is available in the Hero section. It provides a ready-to-use resume file.'
  }
  
  return 'Great question! I am learning constantly. For more detailed conversation, please use the contact form or email me directly.'
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isAwaitingResumeConfirm, setIsAwaitingResumeConfirm] = useState(false)
  const [isAwaitingContactChoice, setIsAwaitingContactChoice] = useState(false)
  const [inputText, setInputText] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'bot', text: 'Hi there! I am a portfolio chatbot. Ask me about this website or message me directly.' },
  ])

  const [nextId, setNextId] = useState(2)

  const messageEndRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const suggestionsRef = useRef<HTMLDivElement | null>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Smooth button entrance on first render
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 80)

    // Cleanup debounce timer on unmount
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsClosing(false)
      }, 260)
    } else {
      setIsOpen(true)
    }
  }

  const addMessage = (role: 'user' | 'bot', text: string) => {
    const id = nextId
    setNextId((prev) => prev + 1)
    setMessages((cur) => [...cur, { id, role, text }])
    return id
  }

  /**
   * Handle input change with debounced suggestion update
   */
  const handleInputChange = (value: string) => {
    setInputText(value)
    setSelectedSuggestionIndex(0)

    // Clear previous debounce
    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    // Debounce suggestion search (300ms)
    debounceTimer.current = setTimeout(() => {
      if (value.trim().length > 0) {
        const newSuggestions = findSuggestions(value)
        setSuggestions(newSuggestions)
        setShowSuggestions(newSuggestions.length > 0)
      } else {
        setShowSuggestions(false)
        setSuggestions([])
      }
    }, 300)
  }

  /**
   * Apply selected suggestion to input
   */
  const applySuggestion = (suggestion: Suggestion) => {
    setInputText(suggestion.keyword)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleSend = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return

    addMessage('user', trimmed)
    setInputText('')

    // Handle contact choice state
    if (isAwaitingContactChoice) {
      setIsAwaitingContactChoice(false)
      const lower = trimmed.toLowerCase()

      if (lower === 'e' || lower === 'email') {
        setIsTyping(true)
        setTimeout(() => {
          addMessage('bot', 'My email is akshaykrishmepp@gmail.com. Feel free to reach out anytime!')
          setIsTyping(false)
        }, 380)
      } else if (lower === 'p' || lower === 'phone') {
        setIsTyping(true)
        setTimeout(() => {
          addMessage('bot', 'My phone number is 9495805611. Call or message me whenever you need.')
          setIsTyping(false)
        }, 380)
      } else {
        setIsTyping(true)
        setTimeout(() => {
          addMessage('bot', 'Please answer with email or phone so I can provide your preferred contact method.')
          setIsTyping(false)
          setIsAwaitingContactChoice(true)
        }, 380)
      }

      return
    }

    // Handle resume confirmation state
    if (isAwaitingResumeConfirm) {
      setIsAwaitingResumeConfirm(false)
      const lower = trimmed.toLowerCase()

      if (lower === 'y' || lower === 'yes') {
        setIsTyping(true)
        setTimeout(() => {
          addMessage('bot', 'Great! Downloading resume now...')
          setIsTyping(false)

          const link = document.createElement('a')
          link.href = '/resume.docx'
          link.download = 'resume.docx'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }, 380)
      } else if (lower === 'n' || lower === 'no') {
        setIsTyping(true)
        setTimeout(() => {
          addMessage('bot', 'No problem. You can find the resume in the Hero section via the Resume button.')
          setIsTyping(false)
        }, 380)
      } else {
        setIsTyping(true)
        setTimeout(() => {
          addMessage('bot', 'Please answer with yes or no so I can proceed.')
          setIsTyping(false)
          setIsAwaitingResumeConfirm(true)
        }, 380)
      }

      return
    }

    setIsTyping(true)

    const lower = trimmed.toLowerCase()
    const botResponse = getBotResponse(trimmed)
    
    if (lower.includes('contact')) {
      setIsAwaitingContactChoice(true)
      setTimeout(() => {
        addMessage('bot', 'Would you prefer email or phone?')
        setIsTyping(false)
      }, 380)
      return
    }

    if (lower.includes('resume')) {
      setIsAwaitingResumeConfirm(true)
      setTimeout(() => {
        addMessage('bot', 'Would you like me to download the resume for you? Please answer yes or no.')
        setIsTyping(false)
      }, 380)
      return
    }

    setTimeout(() => {
      addMessage('bot', botResponse)
      setIsTyping(false)
    }, 550)
  }

  /**
   * Handle keyboard navigation for suggestions + Enter to send
   * Arrow Up/Down: Navigate suggestions
   * Enter: Apply selected suggestion or send message
   */
  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Down: Next suggestion
    if (event.key === 'ArrowDown' && showSuggestions) {
      event.preventDefault()
      setSelectedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
      return
    }

    // Arrow Up: Previous suggestion
    if (event.key === 'ArrowUp' && showSuggestions) {
      event.preventDefault()
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0))
      return
    }

    // Enter: Apply suggestion or send message
    if (event.key === 'Enter') {
      event.preventDefault()

      // If suggestion is showing, apply it
      if (showSuggestions && suggestions.length > 0) {
        applySuggestion(suggestions[selectedSuggestionIndex])
        return
      }

      // Otherwise send message
      handleSend()
    }
  }

  useEffect(() => {
    if (!messageEndRef.current) return
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })

    const messages = containerRef.current?.children
    if (!messages || !messages.length) return
    const last = messages[messages.length - 1] as HTMLElement

    // Premium entrance animation with stagger
    gsap.fromTo(
      last, 
      { opacity: 0, y: 16, scale: 0.88, rotationX: -10 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotationX: 0,
        duration: 0.42, 
        ease: 'back.out(1.6)',
        overwrite: 'auto'
      }
    )
  }, [messages, isTyping])

  useEffect(() => {
    if (!panelRef.current) return
    if (isOpen) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.33, ease: 'power3.out' })
    }
  }, [isOpen])

  const panelVisible = isOpen || isClosing

  return (
    <section className="fixed bottom-6 right-6 z-50">
      <style>{`
        @keyframes chatbot-button-enter {
          from { opacity: 0; transform: translate(14px, 14px) scale(0.75); }
          to { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes chatbot-panel-open {
          from { opacity: 0; transform: translateY(18px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatbot-panel-close {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(18px) scale(0.94); }
        }
        @keyframes chatbot-typing-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
        @keyframes message-slide-in {
          from { opacity: 0; transform: translateY(12px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes message-bounce-in {
          0% { opacity: 0; transform: scale(0.88) translateY(8px); }
          50% { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(6, 182, 212, 0); }
        }
        .message-animate {
          animation: message-slide-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .message-bot {
          animation: message-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .message-bot:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(6, 182, 212, 0.15);
        }
        .message-user {
          animation: message-bounce-in 0.32s ease-out forwards;
          transition: all 0.3s ease;
        }
        .message-user:hover {
          transform: translateY(-2px);
        }
        @keyframes suggestion-slide-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative">
        {/* Circular floating button */}
        <button
          onClick={handleToggle}
          className={`absolute bottom-0 right-0 w-14 h-14 rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-[0_20px_35px_rgba(8,145,255,0.35)] transition duration-300 ease-in-out transform ${
            isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0.8'
          } hover:scale-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.55)]`}
          style={{ animation: isMounted ? 'chatbot-button-enter 0.48s cubic-bezier(0.16,0.63,0.27,0.93) forwards' : undefined }}
          aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        >
          <span className="block w-6 h-6 mx-auto">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M4 4h16v10H5.17L4 15.17V4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 14c0 4-4 8-10 8a10 10 0 0 1-4-.82L2 22l1.82-6A9.94 9.94 0 0 1 2 14c0-4.42 4-8 10-8s10 3.58 10 8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
            </svg>
          </span>
        </button>

        {panelVisible && (
          <div
            ref={panelRef}
            className={`mt-16 w-[320px] max-w-[88vw] bg-slate-900/90 border border-white/15 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden ${
              isOpen && !isClosing ? 'animate-[chatbot-panel-open_0.28s_ease-in-out_forwards]' : 'animate-[chatbot-panel-close_0.2s_ease-in-out_forwards]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20">
              <div>
                <p className="text-sm font-semibold text-white">Portfolio Chat Coach</p>
                <p className="text-xs text-gray-300">AI assistant for your profile</p>
              </div>
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-full hover:bg-white/10 transition"
                aria-label="Close chatbot panel"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={containerRef}
              className="max-h-60 overflow-y-auto px-3 py-3 space-y-2 scrollbar-thin scrollbar-thumb-cyan-400/40 scrollbar-track-transparent"
            >
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-cyan-500/30 text-white border border-cyan-300/30 message-user'
                        : 'bg-gray-800/80 text-gray-100 border border-white/10 message-bot'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-center gap-2 py-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-[chatbot-typing-dot_1.2s_infinite]" style={{ animationDelay: '0s' }} />
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-[chatbot-typing-dot_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 animate-[chatbot-typing-dot_1.2s_infinite]" style={{ animationDelay: '0.35s' }} />
                  <span className="text-xs text-gray-300">Typing...</span>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/10 bg-slate-900/85 relative">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={onEnterPress}
                    className="w-full min-h-[44px] px-3 py-2 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder:text-gray-400 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 transition"
                    placeholder="Ask a question..."
                    autoComplete="off"
                  />

                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute bottom-full left-0 right-0 mb-1 bg-slate-800 border border-white/20 rounded-lg shadow-lg z-10 overflow-hidden"
                      style={{
                        animation: 'suggestion-slide-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                      }}
                    >
                      <div className="px-3 py-2 border-b border-white/10 text-xs text-cyan-200 tracking-wide">
                        Did you mean?
                      </div>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={`${suggestion.keyword}-${index}`}
                          onClick={() => applySuggestion(suggestion)}
                          className={`w-full text-left px-3 py-2 transition ${
                            index === selectedSuggestionIndex
                              ? 'bg-cyan-500/30 border-l-2 border-cyan-400'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          <span
                            className={`text-sm font-medium ${
                              index === selectedSuggestionIndex ? 'text-cyan-300' : 'text-white'
                            }`}
                          >
                            {suggestion.keyword}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            ({Math.round(suggestion.similarity * 100)}%)
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSend}
                  className="min-w-[48px] h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium transition hover:brightness-110"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
