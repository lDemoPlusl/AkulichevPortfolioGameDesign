import {useEffect, useState} from "react"
import {Award, Gamepad2, Medal, Star, Trophy} from "lucide-react"
import {cn} from "@/lib/utils";
import {ARCHIVEMENTS} from "@/constants/archivements";

// Add this function to render the appropriate icon based on iconType
const renderIcon = (iconType: string) => {
  switch (iconType) {
    case "trophy":
      return <Trophy className="h-5 w-5" />
    case "star":
      return <Star className="h-5 w-5" />
    case "gamepad2":
      return <Gamepad2 className="h-5 w-5" />
    case "award":
      return <Award className="h-5 w-5" />
    case "medal":
      return <Medal className="h-5 w-5" />
    default:
      return <Star className="h-5 w-5" />
  }
}

export function AchievementBadges() {
  const [userAchievements, setUserAchievements] = useState(ARCHIVEMENTS.cards)
  const [showNotification, setShowNotification] = useState(false)
  const [newAchievement, setNewAchievement] = useState<(typeof ARCHIVEMENTS.cards)[0] | null>(null)

  useEffect(() => {
    // Load saved achievements from localStorage
    const savedAchievements = localStorage.getItem("portfolioAchievements")
    if (savedAchievements) {
      setUserAchievements(JSON.parse(savedAchievements))
    }

    // Set up event listeners for achievement triggers
    const handleScroll = () => {
      // Check if user has scrolled to the bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      if (isAtBottom) {
        unlockAchievement("explorer")
      }
    }

    const handleCollectibleFound = (e: CustomEvent) => {
      const collectedCount = e.detail.count
      if (collectedCount >= 3) {
        unlockAchievement("collector")
      }
    }

    const handleLevelUp = (e: CustomEvent) => {
      if (e.detail.level >= 3) {
        unlockAchievement("master")
      }
    }

    // Check if sections are visible for a certain time
    const handleVisibility = () => {
      const sections = document.querySelectorAll(".portfolio-item")
      let viewedCount = 0

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

        if (isVisible) {
          viewedCount++
        }
      })

      if (viewedCount >= 2) {
        unlockAchievement("scholar")
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleVisibility)
    window.addEventListener("collectibleFound", handleCollectibleFound as EventListener)
    window.addEventListener("levelUp", handleLevelUp as EventListener)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleVisibility)
      window.removeEventListener("collectibleFound", handleCollectibleFound as EventListener)
      window.removeEventListener("levelUp", handleLevelUp as EventListener)
    }
  }, [])

  const unlockAchievement = (id: string) => {
    setUserAchievements((prev) => {
      const updated = prev.map((achievement) =>
        achievement.id === id ? { ...achievement, unlocked: true } : achievement,
      )

      // Save to localStorage
      localStorage.setItem("portfolioAchievements", JSON.stringify(updated))

      // Show notification for newly unlocked achievement
      const newlyUnlocked = updated.find((a) => a.id === id && a.initialUnlocked)
      if (newlyUnlocked && !prev.find((a) => a.id === id)?.initialUnlocked) {
        setNewAchievement(newlyUnlocked)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
      }

      return updated
    })
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-yellow-300 mb-4">{ARCHIVEMENTS.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {userAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all",
              achievement.initialUnlocked
                ? "bg-indigo-800 border-2 border-yellow-400"
                : "bg-indigo-900/50 border-2 border-gray-700 opacity-50",
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                achievement.initialUnlocked ? "bg-yellow-400 text-indigo-900" : "bg-gray-700 text-gray-500",
              )}
            >
              {renderIcon(achievement.iconType)}
            </div>
            <h4 className="text-sm font-bold">{achievement.name}</h4>
            <p className="text-xs mt-1 text-gray-300">{achievement.description}</p>
          </div>
        ))}
      </div>

      {/* Achievement notification */}
      {showNotification && newAchievement && (
        <div className="fixed bottom-4 right-4 bg-yellow-400 text-indigo-900 p-3 rounded-lg shadow-lg animate-slide-up z-50 max-w-xs">
          <div className="flex items-center">
            <div className="mr-3">{renderIcon(newAchievement.iconType)}</div>
            <div>
              <h4 className="font-bold">Achievement Unlocked!</h4>
              <p className="text-sm">{newAchievement.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

