import { useState, useEffect } from "react"

export function ExperienceBar() {
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const maxXp = 100

  useEffect(() => {
    // Load saved XP from localStorage if available
    const savedXp = localStorage.getItem("portfolioXp")
    const savedLevel = localStorage.getItem("portfolioLevel")

    if (savedXp) setXp(Number.parseInt(savedXp))
    if (savedLevel) setLevel(Number.parseInt(savedLevel))

    // Set up scroll event listener to increase XP as user scrolls
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight * 0.99 - window.innerHeight)) * 100
      const newXp = Math.min(Math.floor(scrollPercentage), maxXp)

      if (newXp > xp) {
        setXp(newXp)
        localStorage.setItem("portfolioXp", newXp.toString())

        // Level up if XP reaches max
        if (newXp >= maxXp) {
          const newLevel = level + 1
          setLevel(newLevel)
          setXp(0)
          localStorage.setItem("portfolioLevel", newLevel.toString())
          localStorage.setItem("portfolioXp", "0")

          // Show level up animation/notification
          const levelUpEvent = new CustomEvent("levelUp", { detail: { level: newLevel } })
          window.dispatchEvent(levelUpEvent)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [xp, level])

  return (
    <div className="bg-indigo-900 border-2 border-pink-500 p-2 rounded-lg shadow-lg">
      <div className="flex items-center mb-1">
        <div className="bg-yellow-400 text-indigo-900 font-bold text-xs px-2 py-1 rounded-md mr-2">Исследование </div>
        <div className="text-xs text-yellow-300 font-bold">
          50%
        </div>
      </div>
      <div className="w-full h-3 bg-indigo-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-yellow-300 transition-all duration-300 ease-out"
          style={{ width: `${xp}%` }}
        ></div>
      </div>
    </div>
  )
}

