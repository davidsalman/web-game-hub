import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTracker from '@/components/PageTracker'

export const metadata: Metadata = {
  title: {
    default: 'Web Game Hub — Free Unblocked Games',
    template: '%s | Web Game Hub',
  },
  description: 'Play hundreds of free, unblocked HTML5 games directly in your browser. Action, puzzle, racing, sports, strategy and more!',
  keywords: ['free games', 'unblocked games', 'html5 games', 'online games', 'browser games'],
  openGraph: {
    siteName: 'Web Game Hub',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT
  return (
    <html lang="en" className="dark">
      <head>
        {adsenseClient && adsenseClient !== 'ca-pub-your_id' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-sans antialiased bg-gray-950 text-gray-100 flex flex-col min-h-screen">
        <PageTracker />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
