'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Gamepad2, Menu, X, Search, User, LogIn, LogOut } from 'lucide-react'
import SearchBar from './SearchBar'
import { createClient } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/categories', label: 'Categories' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <Gamepad2 className="text-purple-400" size={28} />
            <span className="hidden sm:block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Web Game Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xl font-medium transition-colors ${
                  pathname === href
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {pathname !== '/browse' && (
              <>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                {/* Search bar */}
                {searchOpen && (
                  <div className="py-3 border-t border-gray-800">
                    <SearchBar onClose={() => setSearchOpen(false)} />
                  </div>
                )}
              </>
            )}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="hidden sm:flex p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Profile"
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-lg transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <LogIn size={16} />
                Sign In
              </Link>
            )}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-purple-900/40 text-purple-400'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); handleSignOut() }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm font-medium"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium"
                >
                  <LogIn size={16} /> Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

