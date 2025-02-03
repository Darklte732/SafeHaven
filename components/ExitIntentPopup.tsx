import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useExitIntent } from '@/hooks/useExitIntent'
import { trackEvent } from '@/utils/analytics'

export const ExitIntentPopup = () => {
  const { isShowing, setIsShowing } = useExitIntent()
  const [email, setEmail] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    if (isShowing) {
      trackEvent({ type: 'exit_intent', properties: { shown: true } })
    }
  }, [isShowing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Add your email subscription logic here
      setHasSubmitted(true)
      trackEvent({ 
        type: 'exit_intent',
        properties: { 
          action: 'subscribe',
          email 
        }
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <AnimatePresence>
      {isShowing && !hasSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl"
          >
            <button
              onClick={() => setIsShowing(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Wait! Before You Go...
              </h2>
              <p className="mt-4 text-gray-600">
                Get our free guide on choosing the right insurance coverage for your family.
                Plus, receive exclusive discounts and tips!
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="mt-4 w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get Your Free Guide
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ExitIntentPopup 