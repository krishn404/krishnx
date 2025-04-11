"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  color: string
  index: number
}

export function SkillBadge({ name, color, index }: SkillBadgeProps) {
  return (
    <motion.div
      className={`px-3 py-1 rounded-full text-sm ${color}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        rotate: [-1, 1, -1, 0],
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {name}
    </motion.div>
  )
}
