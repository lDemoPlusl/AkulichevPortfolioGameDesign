import {MobileMenu} from "@/components/mobile-menu";
import {NAME} from "@/constants/name";
import {DICTIONARY} from "@/constants/burger-menu";

export const Header = () => {
    return <>
        {/* Desktop Header */}
            <header className="hidden md:flex items-center justify-between p-4 bg-indigo-900 border-b-4 border-pink-500">
            <div className="text-xl font-bold text-pink-400">{NAME}</div>
            <nav className="flex space-x-6">
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                    {DICTIONARY.EMAIL}
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                    {DICTIONARY.PHONE}
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                    {DICTIONARY.TELEGRAM}
                </a>
                <a href="#about" className="text-white hover:text-yellow-300 transition-colors">
                    {DICTIONARY.ABOUT_ME}
                </a>
                <a href="#portfolio" className="text-white hover:text-yellow-300 transition-colors">
                    {DICTIONARY.PORTFOLIO}
                </a>
            </nav>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-indigo-900 border-b-4 border-pink-500">
            <div className="text-xl font-bold text-pink-400">Yuri Akulichev</div>
            <MobileMenu />
        </header>
        </>
}