import Image from "next/image"

export function PixelAvatar() {
  return (
    <div className="relative">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-500 relative">
        <Image
          src="/placeholder.svg?height=160&width=160"
          alt="Yuri Akulichev"
          width={160}
          height={160}
          className="pixel-image"
        />
      </div>
      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 border-4 border-indigo-900 rounded-full flex items-center justify-center text-indigo-900 font-bold">
        <span className="text-xs">LVL</span>
      </div>
    </div>
  )
}

