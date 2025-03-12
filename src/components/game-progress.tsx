"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GameProgressProps {
  className?: string
}

export function GameProgress({ className }: GameProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate progress based on various interactions
    const calculateProgress = () => {
      let total = 0

      // Check visited sections
      const sections = ["about", "portfolio"]
      const visitedSections = sections.filter((section) => {
        return localStorage.getItem(`visited_${section}`) === "true"
      })
      total += (visitedSections.length / sections.length) * 40 // 40% for visiting all sections

      // Check collectibles
      const collectedItems = JSON.parse(localStorage.getItem("collectedItems") || "[]")
      const totalCollectibles = 3 // Total number of collectibles on the page
      total += (collectedItems.length / totalCollectibles) * 30 // 30% for collecting all items

      // Check achievements
      const achievements = JSON.parse(localStorage.getItem("portfolioAchievements") || "[]")
      const unlockedAchievements = achievements.filter((a: any) => a.unlocked)
      total += (unlockedAchievements.length / achievements.length) * 30 // 30% for unlocking all achievements

      setProgress(Math.min(Math.round(total), 100))
    }

    // Track section visits
    const trackSectionVisit = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const id = section.getAttribute("id")
        if (!id) return

        const rect = section.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

        if (isVisible) {
          localStorage.setItem(`visited_${id}`, "true")
        }
      })

      calculateProgress()
    }

    // Set up event listeners
    window.addEventListener("scroll", trackSectionVisit)
    window.addEventListener("collectibleFound", calculateProgress)
    window.addEventListener("levelUp", calculateProgress)

    // Initial calculation
    calculateProgress()

    return () => {
      window.removeEventListener("scroll", trackSectionVisit)
      window.removeEventListener("collectibleFound", calculateProgress)
      window.removeEventListener("levelUp", calculateProgress)
    }
  }, [])

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-green-400">Portfolio Exploration</h3>
        <span className="text-yellow-300 font-bold">{progress}%</span>
      </div>
      <div className="h-4 bg-indigo-900 border-2 border-pink-500 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

