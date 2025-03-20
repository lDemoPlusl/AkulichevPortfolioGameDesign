import {PixelHeading} from "@/components/pixel-heading";
import {GameProgress} from "@/components/game-progress";
import {PixelDivider} from "@/components/pixel-divider";
import {PortfolioItem} from "@/components/portolio-item";
import {TPortfolio} from "@/types/portfolio";


export function Portfolio({items}: TPortfolio) {
  const {title, items: cards} = items;

  return (
      <section id="portfolio" className="mb-16">
        <PixelHeading className="text-center mb-8">{title}</PixelHeading>

        {/* Game Progress */}
        <GameProgress className="mb-8" />

        {cards.map((item, index) => (<>
            <PortfolioItem key={index} {...item}  />
            {index + 1 !== cards.length && <PixelDivider className="my-12" />}
        </>))}
      </section>
  )
}

