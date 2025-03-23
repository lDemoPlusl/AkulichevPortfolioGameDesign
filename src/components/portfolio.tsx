import {PixelHeading} from "@/components/pixel-heading";
import {GameProgress} from "@/components/game-progress";
import {PixelDivider} from "@/components/pixel-divider";
import {PortfolioItem} from "@/components/portolio-item";
import {TPortfolio} from "@/types/portfolio";
import {Fragment} from "react";


export function Portfolio({items}: TPortfolio) {
  const {title, items: portfolioItems, videoPathPrefix} = items;

  return (
      <section id="portfolio" className="mb-16">
        <PixelHeading className="text-center mb-8">{title}</PixelHeading>

        {/* Game Progress */}
        <GameProgress className="mb-8" />

        {portfolioItems.map(({ cards, title, description, videoFileName, id }, index) =>
            (<Fragment key={id}>
                <PortfolioItem cards={cards} title={title} description={description} videoSrc={`${videoPathPrefix}${videoFileName}`} id={id}  />
                {index + 1 !== portfolioItems.length && <PixelDivider key={index} className="my-12" />}
            </Fragment>))}
      </section>
  )
}

