import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SideArrowProps {
  targetId?: string
  className?: string
}

export function SideArrow({ targetId, className }: SideArrowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Show arrow only after user has scrolled a bit
      const scrollPosition = window.scrollY
      const showThreshold = window.innerHeight * 0.2 // 20% of viewport height
      const hideThreshold = document.body.scrollHeight - window.innerHeight - 200 // Near bottom

      setIsVisible(scrollPosition > showThreshold && scrollPosition < hideThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    if (targetId) {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If no target specified, scroll to next section
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: "smooth",
      })
    }
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-30 transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className={cn(
          "flex items-center cursor-pointer transition-all duration-300 group",
          isHovered ? "translate-x-1" : "",
        )}
      >
        {/* Arrow stem */}
        <div className="relative">
          {/* Pixel art arrow body */}
          <div className="h-16 w-4 bg-pink-500 relative">
            {/* Pixel details */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-pink-600"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-pink-600"></div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-pink-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-pink-400"></div>

            {/* Animated light effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/0 via-yellow-300/30 to-yellow-300/0 animate-pulse-slow"></div>
          </div>

          {/* Arrow head */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-pink-500 transform rotate-45"></div>
              <div className="absolute top-0 left-0 w-2 h-2 bg-pink-400 transform rotate-45"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-pink-600 transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Animated arrow icon */}
        <div
          className={cn(
            "ml-2 bg-indigo-900 border-2 border-pink-500 p-2 transition-all duration-300",
            isHovered ? "translate-x-2" : "translate-x-0",
          )}
        >
          <ArrowRight className="h-5 w-5 text-yellow-300 animate-slide-x" />
        </div>
      </div>
    </div>
  )
}

