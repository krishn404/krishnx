"use client"

import { motion } from "framer-motion"
import { BottomBar } from "@/components/bottom-bar"

export default function StuffPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Art works</h1>
          <p className="text-gray-400">Coming soon...</p>
        </motion.div>
      </main>
      <BottomBar />
    </div>
  )
}
