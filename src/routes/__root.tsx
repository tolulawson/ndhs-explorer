import { useState, useEffect } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { Sidebar } from '../components/Sidebar'
import { Icon } from '../components/Icon'
import { getAllChapters } from '../lib/chapters'
import { initAnalytics } from '../lib/analytics'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Nigeria DHS 2024 Explorer',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chapters = getAllChapters()

  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-100">
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <Sidebar
            chapters={chapters}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />

          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 z-20 shadow-sm flex-shrink-0">
              <div className="flex items-center">
                <button
                  className="lg:hidden p-2 -ml-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Icon name="Menu" />
                </button>
                <span className="font-bold text-gray-800 text-lg hidden sm:block tracking-tight">
                  Nigeria 2024 DHS Explorer
                </span>
                <span className="font-bold text-gray-800 text-lg sm:hidden">
                  NDHS 2024
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="./FR395.pdf"
                  download
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 transition-colors cursor-pointer"
                >
                  <Icon name="Download" size={14} />
                  Download Report
                </a>
              </div>
            </header>

            {/* Main Content Area */}
            <main
              id="main-content"
              className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth bg-slate-50"
            >
              <div className="max-w-7xl mx-auto pb-12">{children}</div>
            </main>
          </div>
        </div>

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
