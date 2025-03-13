import {PixelAvatar} from "@/components/pixel-avatar";
import {QuestLog} from "@/components/quest-log";
import {HERO_LINKS} from "@/constants/links";
import {NAME} from "@/constants/name";
import {POSITION} from "@/constants/position";

export const Hero = () => {
    return <section className="flex flex-col items-center text-center mb-16 mt-8">
        <div className="relative mb-6">
            <PixelAvatar />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-pink-400">{NAME}</h1>
        <h2 className="text-xl md:text-2xl mb-6 text-yellow-300 pixel-shadow">{POSITION}</h2>

        <div className="border-2 border-dashed border-pink-500 p-4 md:p-6 max-w-md md:max-w-lg mx-auto mb-8">
            <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
                {HERO_LINKS.map(({id, title, link}) =>
                    <a key={id} href={link} className="text-green-400 hover:text-green-300">
                        {title}
                    </a>
                )}
            </div>
        </div>

        {/* Quest Log */}
        <QuestLog />
    </section>
}