import { useState, useEffect } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateScroll = () => {
      // Calculate how much we have scrolled
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

      if (scrollHeight) {
        setProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateScroll)

    // Cleanup
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return progress
} 