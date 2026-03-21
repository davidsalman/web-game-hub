export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  game_count?: number
  created_at: string
}

export interface Game {
  id: string
  name: string
  slug: string
  description: string
  category_id: string
  category?: Category
  thumbnail_url: string
  game_url: string
  is_featured: boolean
  play_count: number
  rating: number
  tags: string[]
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  username: string
  avatar_url?: string
  bio?: string
  favorite_games: string[]
  total_plays: number
  created_at: string
  updated_at: string
}

export interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}
