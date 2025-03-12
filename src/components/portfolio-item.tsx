import { PixelCard } from "./pixel-card"
import { CollectibleItem } from "./collectible-item"

interface PortfolioItemProps {
  title: string
  videoSrc: string
  description: string
  responsibilities: string[]
  achievements: string[]
  collectibleId?: string
}

export function PortfolioItem({
  title,
  videoSrc,
  description,
  responsibilities,
  achievements,
  collectibleId,
}: PortfolioItemProps) {
  return (
    <div className="space-y-6 relative">
      <h3 className="text-xl md:text-2xl font-bold text-green-400">{title}</h3>

      <div className="relative aspect-video w-full overflow-hidden border-4 border-pink-500">
        <img src={videoSrc || "/placeholder.svg"} alt={`${title} video`} className="object-cover pixel-image" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-pink-500 bg-opacity-80 flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

      <p className="text-lg">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PixelCard className="h-full">
          <h4 className="text-lg font-bold text-pink-400 mb-4">Responsibilities</h4>
          <ul className="space-y-2">
            {responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-400 mr-2">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PixelCard>

        <PixelCard className="h-full">
          <h4 className="text-lg font-bold text-pink-400 mb-4">Achievements</h4>
          <ul className="space-y-2">
            {achievements.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-400 mr-2">★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PixelCard>
      </div>

      {collectibleId && <CollectibleItem id={collectibleId} className="absolute top-0 right-0" />}
    </div>
  )
}

