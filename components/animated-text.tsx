"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className}>{text}</span>
  }

  // For LEGION, we'll animate each letter instead of words
  const letters = text.split("")

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ filter: "blur(8px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{
            delay: delay + i * 0.1,
            duration: 0.6,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}
