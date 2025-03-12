import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
}

export function PixelButton({ children, variant = "primary", className, ...props }: PixelButtonProps) {
  return (
    <button
      className={cn(
        "relative px-6 py-2 font-pixel text-lg transition-transform active:translate-y-1",
        "before:absolute before:inset-0 before:border-4 before:border-current",
        "after:absolute after:inset-0 after:translate-x-1 after:translate-y-1 after:-z-10 after:border-4 after:border-current",
        variant === "primary"
          ? "bg-yellow-400 text-indigo-900 hover:bg-yellow-300 after:bg-yellow-600"
          : "bg-pink-500 text-white hover:bg-pink-400 after:bg-pink-700",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

