'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Maximize2, RotateCcw, X } from 'lucide-react'

const COOKIE_NAME = 'wgh_pages'
const REQUIRED_PAGES = 2

function getPageCount(): number {
  if (typeof document === 'undefined') return 0
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(\\d+)`))
  return match ? parseInt(match[1], 10) : 0
}

interface PlayClientProps {
  gameUrl: string
  gameName: string
  gameSlug: string
}

export default function GamePlayClient({ gameUrl, gameName, gameSlug }: PlayClientProps) {
  const router = useRouter()
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const count = getPageCount()
    if (count < REQUIRED_PAGES) {
      // Redirect to game info page to build page count
      router.replace(`/games/${gameSlug}`)
    } else {
      setAllowed(true)
    }
  }, [gameSlug, router])

  const toggleFullscreen = useCallback(() => {
    const el = document.getElementById('game-container')
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  const reloadGame = useCallback(() => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement | null
    if (iframe) {
      iframe.src = iframe.src
    }
  }, [])

  if (allowed === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-3 animate-spin">⚙️</div>
          <p>Loading game...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href={`/games/${gameSlug}`}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to {gameName}
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={reloadGame}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Reload game"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Fullscreen"
          >
            {isFullscreen ? <X size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Game Container */}
      <div
        id="game-container"
        className="relative bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl"
        style={{ aspectRatio: '16/9', minHeight: 400 }}
      >
        <iframe
          id="game-iframe"
          src={gameUrl}
          title={gameName}
          className="game-frame w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      <p className="text-center text-gray-600 text-xs mt-3">
        Having trouble? Try{' '}
        <button onClick={reloadGame} className="text-purple-400 hover:text-purple-300 underline">
          reloading the game
        </button>
        .
      </p>
    </div>
  )
}
