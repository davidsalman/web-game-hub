import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Play, Star, TrendingUp, Tag } from 'lucide-react'
import GameCard from '@/components/GameCard'
import AdBanner from '@/components/AdBanner'
import { getGames, getGameBySlug, getCategoryBySlug, getGamesByCategory } from '@/lib/games-data'
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
    title: game.name,
    description: game.description,
    openGraph: {
      title: game.name,
      description: game.description,
      images: [game.thumbnail_url],
    },
  }
}

export const revalidate = 3600

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params
  const game = await getGameBySlug(slug)
  if (!game) notFound()

  const category = game.category ?? (game.category_id ? await getCategoryBySlug(
    (await import('@/lib/games-data')).STATIC_CATEGORIES.find(c => c.id === game.category_id)?.slug ?? ''
  ) : null)

  const relatedGames = category
    ? (await getGamesByCategory(category.slug)).filter(g => g.id !== game.id).slice(0, 4)
    : []

  const ratingStars = Math.round(game.rating)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/categories/${category.slug}`} className="hover:text-white transition-colors">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-300">{game.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Game Preview */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-900 mb-6 group">
            <Image
              src={game.thumbnail_url}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Link
                href={`/games/${game.slug}/play`}
                className="flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-purple-900/50"
              >
                <Play size={28} className="fill-white" />
                Play Now
              </Link>
            </div>
            {game.is_featured && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                ⭐ Featured
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold text-white">{game.name}</h1>
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="shrink-0 flex items-center gap-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {category.icon} {category.name}
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < ratingStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
                <span className="text-white font-semibold ml-1">{game.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <TrendingUp size={16} />
                {game.play_count.toLocaleString()} plays
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-5">{game.description}</p>

            {/* Tags */}
            {game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Tag size={16} className="text-gray-500 mt-0.5" />
                {game.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/browse?q=${encodeURIComponent(tag)}`}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Play CTA */}
          <div className="mt-6 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-800/40 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Ready to Play?</h2>
            <p className="text-gray-400 mb-4">Click the button below to start playing {game.name} for free!</p>
            <Link
              href={`/games/${game.slug}/play`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg rounded-xl transition-colors"
            >
              <Play size={22} className="fill-white" />
              Play {game.name}
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AdBanner slot="8901234567" format="rectangle" className="w-full" />

          {/* Related Games */}
          {relatedGames.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">More {category?.name} Games</h3>
              <div className="space-y-3">
                {relatedGames.map(g => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
