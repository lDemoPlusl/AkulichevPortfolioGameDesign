import {PixelButton} from "./components/pixel-button"
import {PixelCard} from "./components/pixel-card"
import {PixelHeading} from "./components/pixel-heading"
import {Portfolio} from "./components/portfolio"
import {AchievementBadges} from "./components/achievement-badges"
import {ExperienceBar} from "./components/experience-bar"
import {CollectibleItem} from "./components/collectible-item"
import {ScrollArrow} from "./components/scroll-arrow"
import './styles/globals.css'
import {Header} from "@/components/header";
import {Hero} from "@/components/hero";
import {DICTIONARY_CONTENT} from "@/constants/links";
import {ABOUT_ME, DOWNLOAD_RESUME, IS_OPEN_CV_IN_NEW_TAB} from "@/constants/about-me";
import {PORTFOLIO_ITEMS} from "@/constants/portfolio";
import {NAME} from "@/constants/name";
import {POSITION} from "@/constants/position";

export const Generated = () => {
    return <div className="min-h-screen bg-indigo-950 text-white font-pixel font-mono">
        <Header />
        {/* Game UI Overlay - Fixed Position */}
        <div className="fixed z-40 top-14 right-4 md:top-20 md:right-6">
            <ExperienceBar />
        </div>

        <main className="container mx-auto px-4 pb-8 pt-20">
            {/* Hero Section */}
            <Hero />

            {/* Animated Portfolio Arrow */}
            <ScrollArrow targetId="portfolio" />

            {/* About Section */}
            <section id="about" className="mb-16">
                <PixelCard>
                    <PixelHeading>{DICTIONARY_CONTENT.ABOUT_ME}</PixelHeading>
                    <p className="mb-6 leading-relaxed">
                        {ABOUT_ME}
                    </p>
                    <div className="flex justify-center">
                        <a href='./cv.pdf' target={IS_OPEN_CV_IN_NEW_TAB ? '_blank' : undefined}><PixelButton>{DOWNLOAD_RESUME}</PixelButton></a>
                    </div>

                    {/* Collectible Item */}
                    <CollectibleItem id="about-coin" className="absolute top-4 right-4" />
                </PixelCard>

                {/* Achievement Badges */}
                <div className="mt-8">
                    <AchievementBadges />
                </div>
            </section>

            {/* Portfolio Section */}
            <Portfolio items={PORTFOLIO_ITEMS} />
        </main>

        <footer className="bg-indigo-900 border-t-4 border-pink-500 py-4 text-center">
            <p className="text-pink-400 font-bold">{NAME}</p>
            <p className="text-yellow-300">{POSITION}</p>
        </footer>
    </div>
}