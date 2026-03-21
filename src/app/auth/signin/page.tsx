import Link from 'next/link'
import { Chrome, Facebook, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Web Game Hub account.',
}

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-1">Sign in to save your progress and favorites</p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <form action="/api/auth/signin/google" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl transition-colors"
              >
                <Chrome size={20} className="text-blue-500" />
                Continue with Google
              </button>
            </form>
            <form action="/api/auth/signin/facebook" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium rounded-xl transition-colors"
              >
                <Facebook size={20} />
                Continue with Facebook
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Email Form */}
          <form className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors"
            >
              <Mail size={18} />
              Sign In with Email
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-gray-500 hover:text-gray-400">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-gray-500 hover:text-gray-400">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
