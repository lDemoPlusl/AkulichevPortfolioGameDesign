import { cn } from "@/lib/utils"

interface PixelDividerProps {
  className?: string
}

export function PixelDivider({ className }: PixelDividerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="w-2 h-2 bg-pink-500 mx-1"></div>
      <div className="w-2 h-2 bg-yellow-400 mx-1"></div>
      <div className="w-2 h-2 bg-green-400 mx-1"></div>
      <div className="w-4 h-4 bg-pink-500 mx-1"></div>
      <div className="w-2 h-2 bg-green-400 mx-1"></div>
      <div className="w-2 h-2 bg-yellow-400 mx-1"></div>
      <div className="w-2 h-2 bg-pink-500 mx-1"></div>
    </div>
  )
}

