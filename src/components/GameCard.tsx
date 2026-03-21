import Link from 'next/link'
import Image from 'next/image'
import { Star, Play, TrendingUp } from 'lucide-react'
import type { Game } from '@/types'

interface GameCardProps {
  game: Game
  featured?: boolean
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const ratingStars = Math.round(game.rating)

  return (
    <Link href={`/games/${game.slug}`} className="group block">
      <div className={`relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-600/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20 ${featured ? 'h-full' : ''}`}>
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={game.thumbnail_url}
            alt={game.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-600 rounded-full p-4">
              <Play size={24} className="text-white fill-white" />
            </div>
          </div>
          {game.is_featured && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-white text-sm group-hover:text-purple-400 transition-colors line-clamp-1">
            {game.name}
          </h3>
          <p className="text-gray-400 text-xs mt-1 line-clamp-2">{game.description}</p>

          <div className="flex items-center justify-between mt-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={i < ratingStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
              ))}
              <span className="text-gray-400 text-xs ml-1">{game.rating.toFixed(1)}</span>
            </div>

            {/* Play count */}
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <TrendingUp size={12} />
              <span>{(game.play_count / 1000).toFixed(0)}K</span>
            </div>
          </div>

          {/* Tags */}
          {game.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {game.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
