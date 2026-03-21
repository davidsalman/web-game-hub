import Link from 'next/link'
import { Chrome, Facebook, Mail, Gamepad2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your free Web Game Hub account to save progress and track favorites.',
}

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Gamepad2 size={36} className="text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Join Web Game Hub</h1>
            <p className="text-gray-400 mt-1">Free forever. No credit card required.</p>
          </div>

          {/* Perks */}
          <ul className="space-y-2 mb-6">
            {[
              'Save your favorite games',
              'Track your play history',
              'Compete on leaderboards',
              'Get personalized recommendations',
            ].map(perk => (
              <li key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-green-400">✓</span> {perk}
              </li>
            ))}
          </ul>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <form action="/api/auth/signin/google" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl transition-colors"
              >
                <Chrome size={20} className="text-blue-500" />
                Sign up with Google
              </button>
            </form>
            <form action="/api/auth/signin/facebook" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium rounded-xl transition-colors"
              >
                <Facebook size={20} />
                Sign up with Facebook
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-sm">or register with email</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                minLength={3}
                maxLength={30}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="At least 8 characters"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors"
            >
              <Mail size={18} />
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
