"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface InteractivePixelProps {
  className?: string
  color?: string
  size?: number
  children?: React.ReactNode
}

export function InteractivePixel({ className, color = "#ec4899", size = 8, children }: InteractivePixelProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const pixelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isHovered && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [isHovered, isAnimating])

  return (
    <div
      ref={pixelRef}
      className={cn("relative inline-block transition-transform", isAnimating ? "animate-pixel-pop" : "", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0" style={{ backgroundColor: color }} />
      {isHovered && (
        <div className="absolute -inset-1 animate-pixel-glow" style={{ backgroundColor: color, opacity: 0.5 }} />
      )}
      {children}
    </div>
  )
}

