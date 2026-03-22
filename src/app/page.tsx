import Link from 'next/link'
import { ArrowRight, Zap, Star, TrendingUp, Clock } from 'lucide-react'
import GameCard from '@/components/GameCard'
import CategoryCard from '@/components/CategoryCard'
import AdBanner from '@/components/AdBanner'
import { getCategories, getFeaturedGames, getGames, STATIC_GAMES } from '@/lib/games-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Game Hub — Free Unblocked Games Online',
  description: 'Play free unblocked games online. Hundreds of HTML5 games in Action, Puzzle, Racing, Sports, Strategy and more categories.',
}

export const revalidate = 3600

export default async function HomePage() {
  const [categories, featuredGames, allGames] = await Promise.all([
    getCategories(),
    getFeaturedGames(),
    getGames(),
  ])
  const recentGames = allGames.slice(0, 4)
  const popularGames = [...allGames].sort((a, b) => b.play_count - a.play_count).slice(0, 8)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-6 border border-purple-800/50">
            <Zap size={14} className="fill-current" />
            <span>{STATIC_GAMES.length}+ Free Games Available</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Play Free
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"> Unblocked </span>
            Games Online
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Hundreds of HTML5 games playable instantly in your browser. No downloads, no plugins — just pure fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              Browse Games <ArrowRight size={20} />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center  justify-center gap-2 px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              View Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
            {[
              { label: 'Free Games', value: `${STATIC_GAMES.length}+` },
              { label: 'Categories', value: '10' },
              { label: 'Players', value: '500K+' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner slot="1234567890" format="horizontal" className="w-full" />
      </div>

      {/* Featured Games */}
      {featuredGames.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={22} />
              <h2 className="text-2xl font-bold text-white">Featured Games</h2>
            </div>
            <Link href="/browse?filter=featured" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
              See all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredGames.slice(0, 4).map(game => (
              <GameCard key={game.id} game={game} featured />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Game Categories</h2>
          <Link href="/categories" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
            All categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.slice(0, 10).map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Popular Games */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-purple-400" size={22} />
            <h2 className="text-2xl font-bold text-white">Most Popular</h2>
          </div>
          <Link href="/browse" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Recently Released Games */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock size={20} className="text-purple-400" />
          Recently Added Games
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recentGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner slot="0987654321" format="rectangle" className="w-full" />
      </div>
    </div>
  )
}
