"use client"

import { ProjectCard } from "@/components/project-card"
import { Github, Linkedin, Mail } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BottomBar } from "@/components/bottom-bar"
import Head from "next/head"


interface Project {
  title: string
  description: string
  link: string
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [showIntro, setShowIntro] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [showProjects, setShowProjects] = useState(false)

  useEffect(() => {
    const loadProjects = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProjects([
        { title: "Genxie", description: "AI document generator", link: "https://genxie.vercel.app" }, // Fixed typo in URL
        {
          title: "GitFriend",
          description: "AI Git and GitHub helper, README generator and more",
          link: "https://gitfriend.xyz",
        },
        { title: "Linkslide", description: "LinkedIn carousel generator", link: "https://linkslide.vercel.app" },
        { title: "Retrova", description: "Polaroid effect generator", link: "https://retrova.vercel.app" }, // Fixed typo in URL
      ])

      setLoading(false)
      setShowIntro(true)

      // Sequence the animations
      setTimeout(() => setShowName(true), 500)
      setTimeout(() => setShowDescription(true), 1000)
      setTimeout(() => setShowProjects(true), 1500)
    }

    loadProjects()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet" />
      </Head>

      <main className="px-5 py-10 pb-32 max-w-2xl mx-auto relative">
        {showIntro && (
          <section className="mb-4">
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-400 font-mono font-jetbrains"
              >
                Hey! It&apos;s me{" "}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                >
                  👋
                </motion.span>
              </motion.p>
            </div>
          </section>
        )}

        {showName && (
          <section className="mb-4">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2"
              >
                <h1 className="text-4xl font-dosis tracking-wide">
                  <AnimatedText text="KRISHNA" delay={0.2} />
                </h1>
                <span className="text-gray-500 font-jetbrains">/</span>
                <span className="text-gray-500 font-jetbrains">@krishn404</span>
              </motion.div>
            </div>
          </section>
        )}

        {showDescription && (
          <section className="mb-16">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 space-y-2 mt-4"
              >
                <p className="font-figtree">
                  I&apos;m a <span className="text-white font-medium">Front-End Developer</span> with a growing interest
                  in AI and a mind that&apos;s constantly buzzing with project ideas. I love sharing my thoughts and
                  creations with people So, I&apos;m building a tool where people like me can share their ideas freely,
                  connect with others, and maybe even bring those ideas to life together. Outside of code, you&apos;ll
                  find me listening to music and designing for fun.
                </p>

                <p className="pt-4 font-figtree">
                  I love both <span className="text-white font-medium">Development</span> and{" "}
                  <span className="text-white font-medium">Design</span>. So, That means I can create beautiful and
                  functional websites. I&apos;m always looking for new opportunities to learn and grow.
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {showProjects && (
          <section className="mb-10">
            <h2 className="text-xl font-medium mb-4">
              <AnimatedText text="Projects" delay={0.4} />
            </h2>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard title={project.title} description={project.description} link={project.link} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {showProjects && (
          <footer className="flex gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="https://github.com/krishn404" aria-label="GitHub" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="https://linkedin.com/in/krishn404"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="mailto:maharshikrishnakant@gmail.com"
                aria-label="Email"
                className="text-gray-400 hover:text-white"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </footer>
        )}
      </main>

      <BottomBar />
    </div>
  )
}