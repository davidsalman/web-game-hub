-- 002_rls_policies.sql
-- Row Level Security policies for Web Game Hub

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE play_history ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CATEGORIES policies (public read, admin write)
-- ============================================================
CREATE POLICY "categories_select_public"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_insert_service_role"
  ON categories FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "categories_update_service_role"
  ON categories FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "categories_delete_service_role"
  ON categories FOR DELETE
  USING (auth.role() = 'service_role');

-- ============================================================
-- GAMES policies (public read, admin write)
-- ============================================================
CREATE POLICY "games_select_public"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "games_insert_service_role"
  ON games FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "games_update_service_role"
  ON games FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "games_delete_service_role"
  ON games FOR DELETE
  USING (auth.role() = 'service_role');

-- ============================================================
-- PROFILES policies (owner read/write, public read username/avatar)
-- ============================================================

-- Anyone can read basic profile info (username, avatar)
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (true);

-- Users can only insert their own profile
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

-- Users can only update their own profile
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Users can delete their own profile; service role can delete any
CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- ============================================================
-- PLAY HISTORY policies (owner only, service role full access)
-- ============================================================
CREATE POLICY "play_history_select_own"
  ON play_history FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "play_history_insert_own"
  ON play_history FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "play_history_delete_own"
  ON play_history FOR DELETE
  USING (auth.uid() = user_id OR auth.role() = 'service_role');
