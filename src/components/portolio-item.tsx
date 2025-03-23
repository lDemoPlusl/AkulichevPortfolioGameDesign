import {TPortfolioItem} from "@/types/portfolio";
import {PortfolioItems} from "@/components/portolio-achievement";
import {CollectibleItem} from "@/components/collectible-item";

type Props = Omit<TPortfolioItem, 'videoFileName'> & {
    videoSrc: string;
};

export const PortfolioItem = ({cards, title, description, videoSrc, id }: Props) => {

    return <div className="space-y-6 relative">
        <CollectibleItem id={id} className="absolute top-0.5 right-0" />
        <h3 className="text-xl md:text-2xl font-bold text-green-400">{title}</h3>

        <div className="relative aspect-video w-full overflow-hidden border-4 border-pink-500">
            <video controls className='size-full'>
                <source src={videoSrc} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            {/*<img src={videoSrc || "/placeholder.svg"} alt={`${description} video`}*/}
            {/*     className="object-cover pixel-image"/>*/}
        </div>

        <p className="text-lg">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map(({title, items, icon}, index) => <PortfolioItems title={title} key={index} items={items} icon={icon} />)}
        </div>

    </div>
}