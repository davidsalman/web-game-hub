-- 001_create_tables.sql
-- Web Game Hub database schema

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '🎮',
  color TEXT NOT NULL DEFAULT 'from-purple-600 to-pink-500',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  thumbnail_url TEXT NOT NULL DEFAULT '',
  game_url TEXT NOT NULL DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  play_count INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3,1) NOT NULL DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  favorite_games UUID[] NOT NULL DEFAULT '{}',
  total_plays INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Game play history
CREATE TABLE IF NOT EXISTS play_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  played_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_games_category_id ON games(category_id);
CREATE INDEX IF NOT EXISTS idx_games_slug ON games(slug);
CREATE INDEX IF NOT EXISTS idx_games_is_featured ON games(is_featured);
CREATE INDEX IF NOT EXISTS idx_games_play_count ON games(play_count DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_user_id ON play_history(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_game_id ON play_history(game_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
