import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  gameCount?: number
}

export default function CategoryCard({ category, gameCount }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className={`relative bg-gradient-to-br ${category.color} p-0.5 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300`}>
        <div className="bg-gray-900 rounded-[10px] p-5 h-full hover:bg-gray-900/90 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className={`font-bold text-white text-lg group-hover:text-xl group-hover:bg-gradient-to-r group-hover:bg-clip-text`}
                style={{ backgroundImage: undefined }}>
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">
              {gameCount !== undefined ? `${gameCount} games` : (category.game_count ? `${category.game_count} games` : 'Explore games')}
            </span>
            <ArrowRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}
