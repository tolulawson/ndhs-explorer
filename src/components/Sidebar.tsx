import { Link, useLocation } from '@tanstack/react-router'
import { Icon } from './Icon'
import type { ChapterMetadata } from '../lib/chapters'

interface SidebarProps {
  chapters: ChapterMetadata[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ chapters, isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const currentChapterId = location.pathname.startsWith('/chapter/')
    ? parseInt(location.pathname.split('/')[2], 10)
    : null

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-green-900 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-auto shadow-2xl flex flex-col`}
    >
      <div className="p-6 border-b border-green-800 bg-green-950 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          NDHS Explorer
        </h2>
        <p className="text-green-400 text-xs mt-1 font-medium tracking-wider">
          FULL 2024 REPORT
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto sidebar-scroll p-4 space-y-1">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all mb-4 ${
            isHome
              ? 'bg-white text-green-900 shadow-md font-bold'
              : 'text-green-100 hover:bg-green-800 hover:text-white'
          }`}
        >
          <Icon name="Home" size={18} />
          <span>Executive Summary</span>
        </Link>

        <div className="px-4 py-2 text-xs font-bold text-green-400 uppercase tracking-wider opacity-80">
          All Chapters
        </div>

        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            to="/chapter/$id"
            params={{ id: String(chapter.id) }}
            onClick={() => setIsOpen(false)}
            className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center space-x-3 transition-all text-sm group ${
              currentChapterId === chapter.id
                ? 'bg-green-700 text-white shadow font-semibold translate-x-1'
                : 'text-green-100 hover:bg-green-800/50 hover:text-white'
            }`}
          >
            <span
              className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs ${
                currentChapterId === chapter.id
                  ? 'bg-green-600'
                  : 'bg-green-800 group-hover:bg-green-700'
              }`}
            >
              {chapter.id}
            </span>
            <span className="truncate">{chapter.title}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 bg-green-950 border-t border-green-800 text-[10px] text-green-400 text-center">
        <a
          href="https://dhsprogram.com/methodology/survey/survey-display-609.cfm"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-300 underline"
        >
          Data Source
        </a>
        : Nigeria DHS 2024 Final Report
        <br />
        NPC, FMOH, USAID, ICF
      </div>
    </div>
  )
}
