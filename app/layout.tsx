import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomBar } from "@/components/bottom-bar" // Adjust the import path if needed

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Krishna Kant | Front-end Developer",
  description: "Front-end developer with expertise in Next.js, React, TypeScript, and JavaScript",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  )
}