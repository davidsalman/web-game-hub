// Supabase Auth utilities — replaces NextAuth
// Authentication is handled directly by Supabase Auth.
// Use createClient() from @/lib/supabase in Client Components for browser-side auth.
// Use createServerClient() from @/lib/supabase in Server Components and Route Handlers.

export type { Session, User } from '@supabase/supabase-js'
