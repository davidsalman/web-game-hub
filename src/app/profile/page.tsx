import Link from 'next/link'
import { User, Gamepad2, Heart, Clock, Settings } from 'lucide-react'
import { getGames } from '@/lib/games-data'
import GameCard from '@/components/GameCard'
import { createServerClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'

type ProfileRow = {
  favorite_games: string[] | null
  total_plays: number | null
}

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your Web Game Hub profile and view your gaming history.',
}

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const allGames = await getGames()

  let favoriteGameIds: string[] = []
  let totalPlays = 0

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('favorite_games, total_plays')
      .eq('user_id', user.id)
      .single<ProfileRow>()

    favoriteGameIds = profile?.favorite_games ?? []
    totalPlays = profile?.total_plays ?? 0
  }

  const recentGames = allGames.slice(0, 4)
  const favoriteGames = user
    ? allGames.filter(game => favoriteGameIds.includes(game.id)).slice(0, 4)
    : allGames.filter(g => g.is_featured).slice(0, 4)

  const estimatedHoursPlayed = Math.floor(totalPlays * 0.25)

  const displayName = user?.user_metadata?.full_name
    ?? user?.user_metadata?.username
    ?? user?.email?.split('@')[0]
    ?? 'Player'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center overflow-hidden">
            {user?.user_metadata?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.user_metadata.avatar_url} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <User size={36} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">
                {user ? displayName : 'Guest Player'}
              </h1>
              {!user && (
                <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full">Not signed in</span>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              {user ? user.email : 'Sign in to save your progress and track your games!'}
            </p>
          </div>
          <div className="flex gap-3">
            {user ? (
              <button className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-colors text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Gamepad2, label: 'Games Played', value: user ? totalPlays.toString() : '0' },
          { icon: Heart, label: 'Favorites', value: user ? favoriteGameIds.length.toString() : '0' },
          { icon: Clock, label: 'Hours Played', value: user ? estimatedHoursPlayed.toString() : '0' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
            <Icon size={24} className="text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Sign-in prompt for guests */}
      {!user && (
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-800/40 p-6 mb-8 text-center">
          <Gamepad2 size={36} className="text-purple-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Track Your Gaming Journey</h2>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Create a free account to save your favorite games, track how many hours you&apos;ve played, and get personalized recommendations.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/auth/signup" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors">
              Create Free Account
            </Link>
            <Link href="/auth/signin" className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      )}

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

      {/* Favorite Games */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Heart size={20} className="text-pink-400" />
          {user ? 'Your Favorite Games' : 'Featured Games You Might Like'}
        </h2>
        {favoriteGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {favoriteGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-gray-400 text-sm">
            No favorites yet. Open a game and tap Favorite to add it here.
          </div>
        )}
      </section>
    </div>
  )
}

