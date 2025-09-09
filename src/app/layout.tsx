import './globals.css'
import { AppProvider } from '@/context/AppContext'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Holovia',
  description: 'Holistic wellness assistant — Phase 0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AppProvider>
            <div className="layout">
              <header className="header">
                <div className="container header-inner">
                  <Link href="/" className="logo">
                    <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`} alt="Holovia" width={28} height={28} />
                    <span>Holovia</span>
                  </Link>
                  <div className="spacer" />
                  <nav className="row" aria-label="Main navigation">
                    <Link href="/settings" className="button tertiary" aria-label="Settings">
                      Settings
                    </Link>
                  </nav>
                </div>
              </header>
              <main className="main container">{children}</main>
            </div>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

const logoSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
  <defs>
    <linearGradient id='g' x1='0' x2='1'>
      <stop offset='0%' stop-color='#10b6b0'/>
      <stop offset='100%' stop-color='#6de0db'/>
    </linearGradient>
  </defs>
  <circle cx='32' cy='32' r='28' fill='none' stroke='url(#g)' stroke-width='6' stroke-dasharray='120 80' stroke-linecap='round'/>
  <path d='M32 14c6 7 6 15 0 24-6-9-6-17 0-24Z' fill='url(#g)'/>
</svg>`

