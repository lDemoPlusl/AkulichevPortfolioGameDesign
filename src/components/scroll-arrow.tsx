import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScrollArrowProps {
  targetId: string
  label?: string
}

export function ScrollArrow({ targetId, label = "Portfolio" }: ScrollArrowProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide arrow when user has scrolled past a certain point
      const scrollPosition = window.scrollY
      const threshold = window.innerHeight * 0.5 // Half the viewport height

      setIsVisible(scrollPosition < threshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 cursor-pointer",
        isVisible ? "bottom-8 opacity-100" : "bottom-0 opacity-0 pointer-events-none",
      )}
      onClick={scrollToTarget}
    >
      <div className="flex flex-col items-center">
        <span className="text-yellow-300 font-bold mb-2 pixel-shadow">{label}</span>
        <div className="relative">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center animate-bounce">
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-30"></div>
        </div>
      </div>
    </div>
  )
}

