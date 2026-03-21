import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import GameCard from '@/components/GameCard'
import AdBanner from '@/components/AdBanner'
import { getCategories, getGamesByCategory, getCategoryBySlug } from '@/lib/games-data'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }
  return {
    title: `${category.name} Games`,
    description: `Play free ${category.name.toLowerCase()} games online. ${category.description}`,
  }
}

export const revalidate = 3600

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, games] = await Promise.all([
    getCategoryBySlug(slug),
    getGamesByCategory(slug),
  ])

  if (!category) notFound()

  const featuredInCategory = games.filter(g => g.is_featured)
  const allOtherGames = games.filter(g => !g.is_featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Link href="/categories" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Categories
      </Link>

      {/* Category Header */}
      <div className={`relative bg-gradient-to-br ${category.color} p-0.5 rounded-2xl overflow-hidden mb-8`}>
        <div className="bg-gray-900/95 rounded-[14px] p-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-white">{category.name} Games</h1>
              <p className="text-gray-400 mt-1">{category.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full">
                  {games.length} games
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="6789012345" format="horizontal" className="w-full mb-8" />

      {/* Featured in Category */}
      {featuredInCategory.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">⭐ Featured {category.name} Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredInCategory.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* All Games */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">All {category.name} Games</h2>
        {allOtherGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allOtherGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          games.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No games in this category yet. Check back soon!
            </div>
          )
        )}
      </section>

      <AdBanner slot="7890123456" format="rectangle" className="w-full mt-10" />
    </div>
  )
}
