import { useState, useEffect } from "react"
import { PixelCard } from "./pixel-card"
import { PixelButton } from "./pixel-button"
import { Scroll, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import {QUEST_TEXT_IN_POP_UP, QUESTS, QUESTS_TEXT} from "@/constants/quests";

interface Quest {
  id: string
  title: string
  description: string
  completed: boolean
  reward: string
}

export function QuestLog() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUncompletedQuests, setHasUncompletedQuests] = useState(true)
  const [hasNewQuests, setHasNewQuests] = useState(true)
  const [quests, setQuests] = useState<Quest[]>(QUESTS)

  useEffect(() => {
    // Load saved quest progress
    const savedQuests = localStorage.getItem("portfolioQuests")
    if (savedQuests) {
      setQuests(JSON.parse(savedQuests))
    }

    // Check if user has opened the quest log before
    const hasOpenedQuestLog = localStorage.getItem("hasOpenedQuestLog") === "true"
    if (hasOpenedQuestLog) {
      setHasNewQuests(false)
    }

    // Set up event listeners for quest completion
    const handleScroll = () => {
      // Check if user has scrolled to the bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      if (isAtBottom) {
        completeQuest("explore")
      }
    }

    const handleCollectibleFound = (e: CustomEvent) => {
      const collectedCount = e.detail.count
      if (collectedCount >= 3) {
        completeQuest("collect")
      }
    }

    // Check if all projects are viewed
    const handleVisibility = () => {
      const projects = document.querySelectorAll(".portfolio-item")
      let viewedCount = 0

      projects.forEach((project) => {
        const rect = project.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

        if (isVisible) {
          viewedCount++
        }
      })

      if (viewedCount >= 2) {
        completeQuest("projects")
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleVisibility)
    window.addEventListener("collectibleFound", handleCollectibleFound as EventListener)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleVisibility)
      window.removeEventListener("collectibleFound", handleCollectibleFound as EventListener)
    }
  }, [])

  // Check if there are any uncompleted quests
  useEffect(() => {
    const uncompleted = quests.some((quest) => !quest.completed)
    setHasUncompletedQuests(uncompleted)
  }, [quests])

  const completeQuest = (id: string) => {
    setQuests((prev) => {
      const updated = prev.map((quest) => (quest.id === id ? { ...quest, completed: true } : quest))

      // Save to localStorage
      localStorage.setItem("portfolioQuests", JSON.stringify(updated))

      // Add XP reward for newly completed quest
      const newlyCompleted = updated.find((q) => q.id === id && q.completed)
      if (newlyCompleted && !prev.find((q) => q.id === id)?.completed) {
        const xpReward = Number.parseInt(newlyCompleted.reward.replace(/\D/g, ""))
        const currentXp = Number.parseInt(localStorage.getItem("portfolioXp") || "0")
        const newXp = Math.min(currentXp + xpReward, 100)
        localStorage.setItem("portfolioXp", newXp.toString())
      }

      return updated
    })
  }

  const handleOpenQuestLog = () => {
    setIsOpen(!isOpen)

    // Mark as opened when user clicks the button
    if (!isOpen && hasNewQuests) {
      setHasNewQuests(false)
      localStorage.setItem("hasOpenedQuestLog", "true")
    }
  }

  const completedCount = quests.filter((q) => q.completed).length

  return (
    <div className="relative">
      <PixelButton
        variant="secondary"
        onClick={handleOpenQuestLog}
        className={cn("flex items-center gap-2 relative cursor-pointer", !isOpen && hasUncompletedQuests && "animate-quest-pulse")}
      >
        <Scroll className={cn("h-4 w-4", !isOpen && hasNewQuests && "animate-quest-icon-pulse")} />
        <span>
          {QUESTS_TEXT} {completedCount}/{quests.length}
        </span>

        {/* Notification dot for new quests */}
        {!isOpen && hasNewQuests && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-quest-notification"></span>
        )}
      </PixelButton>

      {isOpen && (
        <div className="absolute z-30 top-full left-1/2 transform -translate-x-1/2 mt-4 md:w-max">
          <PixelCard>
            <h3 className="text-xl font-bold text-yellow-300 mb-4">{QUEST_TEXT_IN_POP_UP}</h3>
            <div className="space-y-4">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3 border-l-4 ${quest.completed ? "border-green-400 bg-green-400/10" : "border-yellow-400 bg-yellow-400/10"}`}
                >
                  <div className="flex items-start">
                    <div className="mt-1 mr-2">
                      {quest.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <Circle className={cn("h-5 w-5 text-yellow-400", !quest.completed && "animate-pulse")} />
                      )}
                    </div>
                    <div className='md:text-left'>
                      <h4 className="font-bold">{quest.title}</h4>
                      <p className="text-sm text-gray-300">{quest.description}</p>
                      <div className="text-xs mt-1 font-bold text-green-400">
                        {quest.completed ? "Completed!" : `Reward: ${quest.reward}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>
      )}
    </div>
  )
}

