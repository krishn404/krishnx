// components/bottom-bar.tsx
"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Home, Palette, Bot } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Create a component-level flag to track if the component has been mounted
let isMounted = false

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  href: string
}

const NavItem = ({ icon, label, isActive, href }: NavItemProps) => {
  return (
    <Link href={href} className="outline-none">
      <div className="relative flex items-center justify-center">
        <motion.div
          className={`flex items-center justify-center px-4 py-3 transition-all cursor-pointer
            ${isActive ? "text-black" : "text-white/70"}`}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div initial={false} animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
              {icon}
            </motion.div>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-medium overflow-hidden whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </div>
        </motion.div>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-white rounded-full -z-10"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}
      </div>
    </Link>
  )
}

export function BottomBar() {
  const pathname = usePathname()
  const shouldAnimate = useRef(!isMounted)

  useEffect(() => {
    // Mark as mounted after first render
    isMounted = true
    return () => {
      if (typeof window === "undefined") {
        isMounted = false
      }
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center justify-between bg-black/90 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-lg"
        initial={shouldAnimate.current ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <NavItem icon={<Home size={20} />} label="Home" isActive={pathname === "/"} href="/" />
        <NavItem icon={<Palette size={20} />} label="Stuff" isActive={pathname === "/stuff"} href="/stuff" />
        <NavItem icon={<Bot size={20} />} label="KrishnAI" isActive={pathname === "/krishnai"} href="/krishnai" />
      </motion.div>
    </div>
  )
}

export const NavBar = BottomBar
