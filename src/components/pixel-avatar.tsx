import {NAME} from "@/constants/name";
import {LEVEL_TEXT} from "@/constants/level-text";
import {LINK_TO_PERSONAL_PHOTO} from "@/constants/link-to-personal-photo";

export function PixelAvatar() {
  return (
    <div className="relative">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-500 relative">
        <img
          src={LINK_TO_PERSONAL_PHOTO}
          alt={NAME}
          className="pixel-image size-40 object-cover"
        />
      </div>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 border-4 border-indigo-900 rounded-full flex items-center justify-center text-indigo-900 font-bold">
        <span className="text-xs">{LEVEL_TEXT}</span>
      </div>
    </div>
  )
}

