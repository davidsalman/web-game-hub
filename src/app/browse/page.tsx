'use client'

import { useState, useMemo, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import GameCard from '@/components/GameCard'
import AdBanner from '@/components/AdBanner'
import { STATIC_GAMES, STATIC_CATEGORIES } from '@/lib/games-data'
import { Filter, Search, X } from 'lucide-react'

function BrowseContent() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter') ?? ''
  const queryParam = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category') ?? ''

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'new'>('popular')
  const [searchQuery, setSearchQuery] = useState(queryParam)

  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam])

  const filteredGames = useMemo(() => {
    let games = [...STATIC_GAMES]

    if (filterParam === 'featured') {
      games = games.filter(g => g.is_featured)
    }

    if (selectedCategory) {
      const cat = STATIC_CATEGORIES.find(c => c.slug === selectedCategory)
      if (cat) games = games.filter(g => g.category_id === cat.id)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      games = games.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'popular') games.sort((a, b) => b.play_count - a.play_count)
    else if (sortBy === 'rating') games.sort((a, b) => b.rating - a.rating)
    else games.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return games
  }, [filterParam, selectedCategory, searchQuery, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {filterParam === 'featured' ? 'Featured Games' : 'Browse Games'}
        </h1>
        <p className="text-gray-400">{filteredGames.length} games found</p>
      </div>

      {/* Ad */}
      <AdBanner slot="2345678901" format="horizontal" className="w-full mb-8" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-gray-500" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'popular' | 'rating' | 'new')}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="new">Newest</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          All
        </button>
        {STATIC_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.slug ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎮</div>
          <h2 className="text-xl font-semibold text-white mb-2">No games found</h2>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}

      <AdBanner slot="3456789012" format="horizontal" className="w-full mt-10" />
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-gray-400">Loading games...</div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  )
}
