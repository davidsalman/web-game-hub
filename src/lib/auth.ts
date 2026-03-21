import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Credentials from 'next-auth/providers/credentials'
import { createServiceClient } from './supabase'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const supabase = createServiceClient()
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          })
          if (error || !data.user) return null
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name ?? data.user.email,
            image: data.user.user_metadata?.avatar_url ?? null,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user }) {
      if (!user?.email) return true
      try {
        const supabase = createServiceClient()
        const { data: existing } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()
        if (!existing) {
          await supabase.from('profiles').insert({
            user_id: user.id,
            username: user.name ?? user.email?.split('@')[0] ?? 'Player',
            avatar_url: user.image ?? null,
            favorite_games: [],
            total_plays: 0,
          })
        }
      } catch {
        // Profile creation is non-blocking
      }
      return true
    },
  },
  session: { strategy: 'jwt' },
})
