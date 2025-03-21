import {TPortfolio} from "@/types/portfolio";
import {PortfolioItems} from "@/components/portolio-achievement";

export const PortfolioItem = ({cards, title, description, videFileName }: TPortfolio['items']) => {

    return <div className="space-y-6 relative">
        <h3 className="text-xl md:text-2xl font-bold text-green-400">{title}</h3>

        <div className="relative aspect-video w-full overflow-hidden border-4 border-pink-500">
            <video controls className='size-full'>
                <source src={`videos/${videFileName}`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            {/*<img src={videoSrc || "/placeholder.svg"} alt={`${description} video`}*/}
            {/*     className="object-cover pixel-image"/>*/}
        </div>

        <p className="text-lg">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map(({title, items, icon}, index) => <PortfolioItems title={title} key={index} items={items} icon={icon} />)}
        </div>

        {/*{collectibleId && <CollectibleItem id={collectibleId} className="absolute top-0 right-0" />}*/}
    </div>
}