"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CollectibleItemProps {
  id: string
  className?: string
}

export function CollectibleItem({ id, className }: CollectibleItemProps) {
  const [collected, setCollected] = useState(false)

  useEffect(() => {
    // Check if this collectible was already collected
    const collectedItems = JSON.parse(localStorage.getItem("collectedItems") || "[]")
    if (collectedItems.includes(id)) {
      setCollected(true)
    }
  }, [id])

  const handleCollect = () => {
    if (collected) return

    // Mark as collected
    setCollected(true)

    // Save to localStorage
    const collectedItems = JSON.parse(localStorage.getItem("collectedItems") || "[]")
    const updatedItems = [...collectedItems, id]
    localStorage.setItem("collectedItems", JSON.stringify(updatedItems))

    // Dispatch event for achievement tracking
    const collectEvent = new CustomEvent("collectibleFound", {
      detail: { id, count: updatedItems.length },
    })
    window.dispatchEvent(collectEvent)

    // Add XP for collecting
    const currentXp = Number.parseInt(localStorage.getItem("portfolioXp") || "0")
    const newXp = Math.min(currentXp + 10, 100) // Add 10 XP, max 100
    localStorage.setItem("portfolioXp", newXp.toString())
  }

  if (collected) return null

  return (
    <div className={cn("w-8 h-8 cursor-pointer animate-float", className)} onClick={handleCollect}>
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute inset-1 bg-yellow-400 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xs">
          ?
        </div>
      </div>
    </div>
  )
}

