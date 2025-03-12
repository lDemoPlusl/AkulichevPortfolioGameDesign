import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PixelCardProps {
  children: ReactNode
  className?: string
}

export function PixelCard({ children, className }: PixelCardProps) {
  return (
    <div
      className={cn(
        "relative p-6 bg-indigo-900 border-4 border-pink-500",
        "before:absolute before:inset-0 before:border-2 before:border-indigo-700 before:m-1",
        className,
      )}
    >
      {children}
    </div>
  )
}

