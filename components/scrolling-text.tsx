"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface ScrollingTextProps {
  text: string
}

export function ScrollingText({ text }: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full overflow-hidden py-4 my-4" ref={containerRef}>
      <motion.div
        className="whitespace-nowrap flex"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <span className="text-3xl font-bold text-muted-foreground/20 px-4">{text}</span>
        <span className="text-3xl font-bold text-muted-foreground/20 px-4">{text}</span>
      </motion.div>
    </div>
  )
}
