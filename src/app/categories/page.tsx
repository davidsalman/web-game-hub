import CategoryCard from '@/components/CategoryCard'
import AdBanner from '@/components/AdBanner'
import { getCategories, getGames } from '@/lib/games-data'
import type { Metadata } from 'next'

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

      <AdBanner slot="5678901234" format="rectangle" className="w-full mt-10" />
    </div>
  )
}
