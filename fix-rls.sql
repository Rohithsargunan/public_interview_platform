-- Quick Fix: Disable RLS for Testing
-- Run this in Supabase SQL Editor if you're getting RLS errors
-- WARNING: Only use this for development/testing, NOT production!

-- Option 1: Temporarily disable RLS (easiest for testing)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE interviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations DISABLE ROW LEVEL SECURITY;
ALTER TABLE reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;

-- Option 2: Add permissive policies (better alternative)
-- Uncomment below if you prefer policies over disabling RLS

/*
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view own interviews" ON interviews;
DROP POLICY IF EXISTS "Users can create own interviews" ON interviews;
DROP POLICY IF EXISTS "Users can update own interviews" ON interviews;
DROP POLICY IF EXISTS "Users can delete own interviews" ON interviews;
DROP POLICY IF EXISTS "Users can view questions for own interviews" ON questions;
DROP POLICY IF EXISTS "Users can create questions for own interviews" ON questions;
DROP POLICY IF EXISTS "Users can view responses for own interviews" ON responses;
DROP POLICY IF EXISTS "Users can create responses for own interviews" ON responses;
DROP POLICY IF EXISTS "Users can view evaluations for own responses" ON evaluations;
DROP POLICY IF EXISTS "Users can view own reports" ON reports;
DROP POLICY IF EXISTS "Users can view own learning plans" ON learning_plans;
DROP POLICY IF EXISTS "Users can create own learning plans" ON learning_plans;
DROP POLICY IF EXISTS "Users can update own learning plans" ON learning_plans;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can create own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON subscriptions;

-- Add permissive policies for development
CREATE POLICY "Allow all for development" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON interviews FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON questions FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON responses FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON evaluations FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON reports FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON learning_plans FOR ALL USING (true);
CREATE POLICY "Allow all for development" ON subscriptions FOR ALL USING (true);
*/

-- Option 3: User-specific policy (use specific user_id)
-- Replace 'demo-user-id' with your actual user ID if different
/*
CREATE POLICY "Allow demo user access" ON interviews 
  FOR ALL USING (user_id = 'demo-user-id');
*/

-- Verify RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'interviews', 'questions', 'responses', 'evaluations', 'reports', 'learning_plans', 'subscriptions')
ORDER BY tablename;

