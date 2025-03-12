"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 focus:outline-none" aria-label="Toggle menu">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-indigo-950 bg-opacity-95 flex flex-col animate-slide-in">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 space-y-8 text-xl">
            <Link
              href="#"
              className="text-white hover:text-yellow-300 transition-colors pixel-menu-item"
              onClick={() => setIsOpen(false)}
            >
              Email
            </Link>
            <Link
              href="#"
              className="text-white hover:text-yellow-300 transition-colors pixel-menu-item"
              onClick={() => setIsOpen(false)}
            >
              Phone
            </Link>
            <Link
              href="#"
              className="text-white hover:text-yellow-300 transition-colors pixel-menu-item"
              onClick={() => setIsOpen(false)}
            >
              Telegram
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-yellow-300 transition-colors pixel-menu-item"
              onClick={() => setIsOpen(false)}
            >
              About Me
            </Link>
            <Link
              href="#portfolio"
              className="text-white hover:text-yellow-300 transition-colors pixel-menu-item"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

