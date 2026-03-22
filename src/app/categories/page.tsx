import Link from 'next/link'
import GameCard from '@/components/GameCard'
import CategoryCard from '@/components/CategoryCard'
import AdBanner from '@/components/AdBanner'
import { getCategories, getGames } from '@/lib/games-data'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Game Categories',
  description: 'Browse all game categories on Web Game Hub. Action, Adventure, Puzzle, Racing, Sports, Strategy, Arcade and more.',
}

export const revalidate = 3600

export default async function CategoriesPage() {
  const [categories, games] = await Promise.all([getCategories(), getGames()])

  const categoryGameCounts = categories.map(cat => ({
    ...cat,
    game_count: games.filter(g => g.category_id === cat.id).length,
  }))

  const newGames = [...games].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Game Categories</h1>
        <p className="text-gray-400 text-lg">
          Explore {categories.length} categories with hundreds of free games.
        </p>
      </div>

      <AdBanner slot="4567890123" format="horizontal" className="w-full mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categoryGameCounts.map(cat => (
          <CategoryCard key={cat.id} category={cat} gameCount={cat.game_count} />
        ))}
      </div>

      {/* New Games */}
      <section className="max-w-7xl mx-auto py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
          <Link href="/browse?filter=new" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {newGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <AdBanner slot="5678901234" format="rectangle" className="w-full mt-10" />
    </div>
  )
}
