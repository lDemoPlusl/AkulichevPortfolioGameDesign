import {PixelCard} from "@/components/pixel-card";
import {TPortfolioItemCard} from "@/types/portfolio";

export const PortfolioItems = ({items, title, icon}:TPortfolioItemCard) => {
    return <PixelCard className="h-full">
        <h4 className="text-lg font-bold text-pink-400 mb-4">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">{icon}</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </PixelCard>
}

//<PixelCard className="h-full">
//                 <h4 className="text-lg font-bold text-pink-400 mb-4">Responsibilities</h4>
//                 <ul className="space-y-2">
//                     {responsibilities.map((item, index) => (
//                         <li key={index} className="flex items-start">
//                             <span className="text-yellow-400 mr-2">→</span>
//                             <span>{item}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </PixelCard>
//
//             <PixelCard className="h-full">
//                 <h4 className="text-lg font-bold text-pink-400 mb-4">Achievements</h4>
//                 <ul className="space-y-2">
//                     {achievements.map((item, index) => (
//                         <li key={index} className="flex items-start">
//                             <span className="text-yellow-400 mr-2">★</span>
//                             <span>{item}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </PixelCard>