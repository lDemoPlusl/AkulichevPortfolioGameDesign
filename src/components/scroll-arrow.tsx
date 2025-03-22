import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {PORTFOLIO_POPUP_BUTTON_TEXT} from "@/constants/portfolio-popup-button-text";

interface ScrollArrowProps {
  targetId: string
  label?: string
}

export function ScrollArrow({ targetId }: ScrollArrowProps) {
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
        "fixed left-1/2 md:right-10 md:left-auto md:-translate-0 transform -translate-x-1/2 z-30 transition-all duration-500 cursor-pointer",
        isVisible ? "bottom-8 md:bottom-4 opacity-100" : "bottom-0 opacity-0 pointer-events-none",
      )}
      onClick={scrollToTarget}
    >
      <div className="flex flex-col items-center">
        <span className="text-yellow-300 font-bold mb-2 pixel-shadow">{PORTFOLIO_POPUP_BUTTON_TEXT}</span>
        <div className="relative mt-3">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center animate-bounce">
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-30"></div>
        </div>
      </div>
    </div>
  )
}

