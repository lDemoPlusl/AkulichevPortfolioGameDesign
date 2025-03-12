import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PixelHeadingProps {
  children: ReactNode
  className?: string
}

export function PixelHeading({ children, className }: PixelHeadingProps) {
  return (
    <h2 className={cn("text-2xl md:text-3xl font-bold mb-6 text-yellow-300 pixel-shadow", className)}>{children}</h2>
  )
}

