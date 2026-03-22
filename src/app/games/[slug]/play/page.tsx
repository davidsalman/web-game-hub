import { notFound } from 'next/navigation'
import { getGames, getGameBySlug } from '@/lib/games-data'
import AdBanner from '@/components/AdBanner'
import GamePlayClient from './GamePlayClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const games = await getGames()
  return games.map(game => ({ slug: game.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const game = await getGameBySlug(slug)
  if (!game) return { title: 'Game Not Found' }
  return {
    title: `Play ${game.name}`,
    description: `Play ${game.name} online for free. ${game.description}`,
    robots: { index: false },
  }
}

export default async function PlayPage({ params }: Props) {
  const { slug } = await params
  const game = await getGameBySlug(slug)
  if (!game) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Game Header */}
      <div className="bg-gray-950 border-b border-gray-800 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-bold text-white">Playing: {game.name}</h1>
        </div>
      </div>

      <AdBanner slot="9012345678" format="horizontal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" />
      
      {/* Game Play Area */}
      <GamePlayClient
        gameUrl={game.game_url}
        gameName={game.name}
        gameSlug={game.slug}
      />

      <AdBanner slot="0123456789" format="horizontal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" />
    </div>
  )
}
