import {PixelButton} from "./components/pixel-button"
import {PixelCard} from "./components/pixel-card"
import {PixelHeading} from "./components/pixel-heading"
import {PixelDivider} from "./components/pixel-divider"
import {PortfolioItem} from "./components/portfolio-item"
import {GameProgress} from "./components/game-progress"
import {AchievementBadges} from "./components/achievement-badges"
import {ExperienceBar} from "./components/experience-bar"
import {CollectibleItem} from "./components/collectible-item"
import {ScrollArrow} from "./components/scroll-arrow"
import './styles/globals.css'
import {Header} from "@/components/header";
import {Hero} from "@/components/hero";

export const Generated = () => {
    return <div className="min-h-screen bg-indigo-950 text-white font-pixel">
        <Header />
        {/* Game UI Overlay - Fixed Position */}
        <div className="fixed z-40 top-14 right-4 md:top-20 md:right-6">
            <ExperienceBar />
        </div>

        <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <Hero />

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