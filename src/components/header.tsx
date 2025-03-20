import {MobileMenu} from "@/components/mobile-menu";
import {NAME} from "@/constants/name";
import {BURGER_MENU} from "@/constants/links";

export const Header = () => {
    return <>
        {/* Desktop Header */}
            <header className="hidden md:flex items-center justify-between p-4 bg-indigo-900 border-b-4 border-pink-500 fixed w-full z-50">
            <div className="text-xl font-bold text-pink-400">{NAME}</div>
            <nav className="flex space-x-6">
                {BURGER_MENU.map(({id, title, link, target}) => <a href={link} target={target} className="text-white hover:text-yellow-300 transition-colors" key={id}>{title}</a>)}
            </nav>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-indigo-900 border-b-4 border-pink-500 fixed w-full z-50">
            <div className="text-xl font-bold text-pink-400">{NAME}</div>
            <MobileMenu />
        </header>
        </>
}