# Database Setup Guide - Real Data Integration

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your account
3. **Click "New Project"**
4. **Choose organization** (or create one)
5. **Fill in project details:**
   - Project name: `interview-platform`
   - Database password: (generate strong password)
   - Region: Choose closest to you
6. **Click "Create new project"**
7. **Wait for project to be ready** (2-3 minutes)

## Step 2: Get Your Credentials

1. **Go to Settings → API** in your Supabase dashboard
2. **Copy these values:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (optional)

## Step 3: Set Up Database Schema

1. **Go to SQL Editor** in Supabase dashboard
2. **Copy and paste** the entire content from `supabase-schema.sql`
3. **Click "Run"** to create all tables
4. **Verify tables** are created in Table Editor

## Step 4: Configure Environment Variables

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 5: Test the Connection

1. **Restart the development server**
2. **Check browser console** for "Supabase connected" message
3. **Visit dashboard** - should show real data (empty initially)

## Step 6: Add Sample Data (Optional)

Run this SQL in Supabase SQL Editor to add sample data:

```sql
-- Insert sample user
INSERT INTO users (id, email, full_name, subscription_tier) 
VALUES ('demo-user-id', 'demo@example.com', 'Demo User', 'free');

-- Insert sample interviews
INSERT INTO interviews (id, user_id, job_role, experience_level, status, overall_score, created_at)
VALUES 
  ('1', 'demo-user-id', 'Software Engineer', '3-5', 'completed', 85, '2024-01-15T10:00:00Z'),
  ('2', 'demo-user-id', 'Product Manager', '3-5', 'completed', 76, '2024-01-10T10:00:00Z'),
  ('3', 'demo-user-id', 'Data Scientist', '1-3', 'in_progress', NULL, '2024-01-05T10:00:00Z');
```

## Troubleshooting

**If you see "Supabase credentials not configured":**
- Check `.env.local` file exists
- Verify URLs and keys are correct
- Restart development server

**If API calls fail:**
- Check Supabase project is active
- Verify database tables exist
- Check browser network tab for errors

## Next Steps

Once connected:
1. **Create real interviews** through the app
2. **Data persists** across sessions
3. **Real-time updates** work
4. **All features** use live data

