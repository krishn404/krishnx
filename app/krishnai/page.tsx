"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUp, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BottomBar } from "@/components/bottom-bar"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function KrishnaAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Krishna's digital twin! I can answer questions about Krishna Kant's skills, projects, experience, and background as a front-end developer. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
    inputRef.current?.focus()
  }, [messages])

  // Handle window resize to ensure proper layout
  useEffect(() => {
    const handleResize = () => {
      scrollToBottom()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      const aiMessage = { role: "assistant" as const, content: data.answer }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header - Fixed at the top */}
      <header className="sticky top-0 left-0 right-0 border-b border-white/10 p-4 bg-black z-10">
        <div className="chat-container">
          <h1 className="text-xl font-medium text-center">Digital Twin</h1>
        </div>
      </header>

      {/* Main content area with proper padding */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Chat container with scrolling */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <div className="chat-container py-6">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mb-4"
                >
                  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-white/10 text-white max-w-[85%] sm:max-w-[75%] md:max-w-[65%]"
                          : "bg-white/5 text-white/90 border border-white/10 max-w-[85%] sm:max-w-[75%] md:max-w-[65%]"
                      }`}
                    >
                      {message.role === "user" ? (
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      ) : (
                        <div className="markdown-content">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                              a: ({ node, ...props }) => (
                                <a
                                  {...props}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline"
                                />
                              ),
                              p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                              ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-2" />,
                              ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 mb-2" />,
                              li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                              h1: ({ node, ...props }) => <h1 {...props} className="text-xl font-bold mb-2" />,
                              h2: ({ node, ...props }) => <h2 {...props} className="text-lg font-bold mb-2" />,
                              h3: ({ node, ...props }) => <h3 {...props} className="text-base font-bold mb-2" />,
                              code: ({ node, inline, ...props }) =>
                                inline ? (
                                  <code {...props} className="bg-white/10 px-1 py-0.5 rounded text-sm" />
                                ) : (
                                  <code
                                    {...props}
                                    className="block bg-white/10 p-2 rounded-md text-sm overflow-x-auto my-2"
                                  />
                                ),
                              pre: ({ node, ...props }) => (
                                <pre {...props} className="bg-transparent overflow-x-auto" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl px-4 py-3 text-white/90 flex items-center gap-2 border border-white/10">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-white/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} className="h-0 w-full" />
          </div>
        </div>

        {/* Input area - Sticky at the bottom */}
        <div className="sticky bottom-0 left-0 right-0 border-t border-white/10 bg-black/95 backdrop-blur-lg py-4 z-20">
          <div className="chat-container">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Krishna's skills, experience, or projects..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-white/10 rounded-full p-3 transition-colors"
                aria-label="Send message"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Bottom navigation spacing */}
      <div className="h-20" aria-hidden="true"></div>
      <BottomBar />
    </div>
  )
}
