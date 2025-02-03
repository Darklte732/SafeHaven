import { useState, useEffect } from 'react'

export const useExitIntent = (sensitivity = 20) => {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    let delayTimer: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when moving towards the top of the page
      if (e.clientY <= sensitivity) {
        setIsShowing(true)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect when user hits browser back button or CMD+W
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        setIsShowing(true)
      }
    }

    // Add delay to avoid showing immediately after page load
    delayTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
      document.addEventListener('keydown', handleKeyDown)
    }, 3000)

    return () => {
      clearTimeout(delayTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [sensitivity])

  return {
    isShowing,
    setIsShowing
  }
} 