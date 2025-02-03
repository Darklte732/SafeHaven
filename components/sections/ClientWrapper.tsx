'use client'

import { motion } from 'framer-motion'

interface ClientWrapperProps {
  children: React.ReactNode
  delay?: number
}

export default function ClientWrapper({ children, delay = 0 }: ClientWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
} 