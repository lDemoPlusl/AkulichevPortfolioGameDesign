import {PixelButton} from "./components/pixel-button"
import {PixelCard} from "./components/pixel-card"
import {PixelAvatar} from "./components/pixel-avatar"
import {PixelHeading} from "./components/pixel-heading"
import {PixelDivider} from "./components/pixel-divider"
import {PortfolioItem} from "./components/portfolio-item"
import {GameProgress} from "./components/game-progress"
import {AchievementBadges} from "./components/achievement-badges"
import {ExperienceBar} from "./components/experience-bar"
import {CollectibleItem} from "./components/collectible-item"
import {QuestLog} from "./components/quest-log"
import {ScrollArrow} from "./components/scroll-arrow"
import './styles/globals.css'
import {Header} from "@/components/header";

export const Generated = () => {
    return <div className="min-h-screen bg-indigo-950 text-white font-pixel">
        <Header />
        {/* Game UI Overlay - Fixed Position */}
        <div className="fixed top-4 right-4 z-40 md:top-20 md:right-6">
            <ExperienceBar />
        </div>

        <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center mb-16 mt-8">
                <div className="relative mb-6">
                    <PixelAvatar />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-pink-400">Yuri Akulichev</h1>
                <h2 className="text-xl md:text-2xl mb-6 text-yellow-300 pixel-shadow">Game Designer</h2>

                <div className="border-2 border-dashed border-pink-500 p-4 md:p-6 max-w-md mx-auto mb-8">
                    <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
                        <a href="mailto:contact@yuriakulichev.com" className="text-green-400 hover:text-green-300">
                            contact@yuriakulichev.com
                        </a>
                        <a href="tel:+1234567890" className="text-green-400 hover:text-green-300">
                            +123 456 7890
                        </a>
                        <a href="https://t.me/yuriakulichev" className="text-green-400 hover:text-green-300">
                            @yuriakulichev
                        </a>
                    </div>
                </div>

                {/* Quest Log */}
                <QuestLog />
            </section>

            {/* Animated Portfolio Arrow */}
            <ScrollArrow targetId="portfolio" />

            {/* About Section */}
            <section id="about" className="mb-16">
                <PixelCard>
                    <PixelHeading>About Me</PixelHeading>
                    <p className="mb-6 leading-relaxed">
                        I'm a passionate game designer with 5+ years of experience creating engaging player experiences. My
                        expertise lies in level design, game mechanics, and narrative development. I believe games should be both
                        challenging and rewarding, creating memorable moments that players cherish.
                    </p>
                    <div className="flex justify-center">
                        <PixelButton>Download Resume</PixelButton>
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
            <section id="portfolio" className="mb-16">
                <PixelHeading className="text-center mb-8">Portfolio</PixelHeading>

                {/* Game Progress */}
                <GameProgress className="mb-8" />

                <PortfolioItem
                    title="Pixel Dungeon Crawler"
                    videoSrc="/placeholder.svg?height=315&width=560"
                    description="A roguelike dungeon crawler with procedurally generated levels and pixel art aesthetics."
                    responsibilities={[
                        "Game mechanics design",
                        "Level progression system",
                        "Enemy AI behavior patterns",
                        "Balancing difficulty curves",
                    ]}
                    achievements={[
                        "100,000+ downloads on Steam",
                        "Featured in Indie Game Showcase 2024",
                        "9/10 average user rating",
                        "Nominated for Best Game Design at Pixel Awards",
                    ]}
                    collectibleId="project1-coin"
                />

                <PixelDivider className="my-12" />

                <PortfolioItem
                    title="Space Colony Simulator"
                    videoSrc="/placeholder.svg?height=315&width=560"
                    description="A strategy simulation game where players build and manage their own space colony."
                    responsibilities={[
                        "Resource management systems",
                        "Colony expansion mechanics",
                        "Character progression",
                        "Event scripting and narrative design",
                    ]}
                    achievements={[
                        "Early Access success with 50,000+ players",
                        "Positive community engagement",
                        "Featured on major gaming publications",
                        "Successfully implemented player feedback",
                    ]}
                    collectibleId="project2-coin"
                />
            </section>
        </main>

        <footer className="bg-indigo-900 border-t-4 border-pink-500 py-4 text-center">
            <p className="text-pink-400 font-bold">Yuri Akulichev</p>
            <p className="text-yellow-300">Game Designer</p>
        </footer>
    </div>
}