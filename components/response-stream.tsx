"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export type TextStreamMode = "word" | "character" | "fade"

export interface TextStreamSegment {
  text: string
  isComplete: boolean
}

export interface UseTextStreamOptions {
  textStream: string
  mode?: TextStreamMode
  speed?: number
  initialDelay?: number
  onComplete?: () => void
}

export function useTextStream({
  textStream,
  mode = "word",
  speed = 30,
  initialDelay = 0,
  onComplete,
}: UseTextStreamOptions) {
  const [segments, setSegments] = useState<TextStreamSegment[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getFadeDuration = useCallback(() => {
    return 1000 // Default fade duration in ms
  }, [])

  const getSegmentDelay = useCallback(
    (index: number) => {
      return index * speed
    },
    [speed]
  )

  // Split the text into segments based on the mode
  const splitText = useCallback(
    (text: string): string[] => {
      if (mode === "character") {
        return text.split("")
      } else if (mode === "word" || mode === "fade") {
        // Split by word but preserve spaces
        return text.split(/(\s+)/)
      }
      return [text]
    },
    [mode]
  )

  // Process the text stream
  useEffect(() => {
    if (!textStream) return

    const textSegments = splitText(textStream)
    const initialSegments = textSegments.map((text) => ({
      text,
      isComplete: false,
    }))

    setSegments(initialSegments)

    // Animate the segments
    let currentIndex = 0

    const animateSegments = () => {
      if (currentIndex < textSegments.length) {
        setSegments((prev) => {
          const updated = [...prev]
          if (updated[currentIndex]) {
            updated[currentIndex] = {
              ...updated[currentIndex],
              isComplete: true,
            }
          }
          return updated
        })

        currentIndex++
        timeoutRef.current = setTimeout(animateSegments, speed)
      } else {
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }

    // Start animation after initial delay
    timeoutRef.current = setTimeout(animateSegments, initialDelay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [textStream, splitText, speed, initialDelay, onComplete])

  return {
    segments,
    isComplete,
    getFadeDuration,
    getSegmentDelay,
  }
}

export interface ResponseStreamProps {
  text: string
  className?: string
  mode?: TextStreamMode
  speed?: number
  initialDelay?: number
  onComplete?: () => void
}

export function ResponseStream({
  text,
  className,
  mode = "word",
  speed = 30,
  initialDelay = 0,
  onComplete,
}: ResponseStreamProps) {
  const { segments, isComplete } = useTextStream({
    textStream: text,
    mode,
    speed,
    initialDelay,
    onComplete,
  })

  return (
    <div className={className}>
      {mode === "character" || mode === "word" ? (
        <div>
          {segments.map((segment, index) => (
            <span key={index} className={segment.isComplete ? "opacity-100" : "opacity-0"}>
              {segment.text}
            </span>
          ))}
        </div>
      ) : (
        <div>
          {segments.map((segment, index) => {
            const isWhitespace = /^\s+$/.test(segment.text)
            return (
              <span
                key={index}
                className={`inline-block ${isWhitespace ? "whitespace-pre" : ""} ${
                  segment.isComplete
                    ? "opacity-100 blur-none"
                    : "opacity-0 blur-[2px]"
                } transition-all duration-1000`}
                style={{
                  transitionDelay: `${index * 2}ms`,
                }}
              >
                {segment.text}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
