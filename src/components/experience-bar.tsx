import {Star} from "lucide-react";
import {ARCHIVEMENTS} from "@/constants/archivements";
import {useExp} from "@/context/exp";

export function ExperienceBar() {
  const coeff = 100 / ARCHIVEMENTS.cards.length;
  const {xp} = useExp();
  const isFullyUnlocked = xp === ARCHIVEMENTS.cards.length;
  const {defaultText, allUnlockedText} = ARCHIVEMENTS.bar;

  return (
    <div className="bg-indigo-900 border-2 border-pink-500 p-2 rounded-lg shadow-lg flex flex-col gap-1">
        {isFullyUnlocked ?
            <div className="bg-green-500/20 border border-green-500 rounded p-1 text-center">
                <span className="text-xs text-green-400 font-bold flex items-center justify-center">
                    <Star className="h-3 w-3 mr-1" />
                    {allUnlockedText}
                    <Star className="h-3 w-3 ml-1" />
                </span>
            </div>
            :
            <div className="flex items-center">
                <div className="bg-yellow-400 text-indigo-900 font-bold text-xs px-2 py-1 rounded-md mr-2">{defaultText}
                </div>
                <div className="text-xs text-yellow-300 font-bold">
                    {xp * coeff}%
                </div>
            </div>
           }
      <div className="w-full h-3 bg-indigo-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-yellow-300 transition-all duration-1000 ease-out"
          style={{ width: `${xp * coeff}%` }}
        ></div>
      </div>
    </div>
  )
}

