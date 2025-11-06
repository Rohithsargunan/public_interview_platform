# Database Connection Diagnostic Guide

## Quick Check

After setting up Supabase, follow these steps to verify connection:

### Step 1: Check Environment Variables

Make sure your `.env.local` file in `interview-platform/` folder has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** 
- URLs must start with `https://`
- Keys should be long strings (100+ characters)
- Restart dev server after changing `.env.local`

### Step 2: Test Connection

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Check server console** - You should see:
   - ✅ `Supabase client initialized successfully` (if connected)
   - ⚠️ Warning messages (if not connected)

3. **Visit test endpoint:**
   ```
   http://localhost:3000/api/test-connection
   ```
   
   Should return:
   ```json
   {
     "connected": true,
     "message": "✅ Successfully connected to Supabase"
   }
   ```

### Step 3: Check Database Tables

In Supabase dashboard:
1. Go to **Table Editor**
2. Verify these tables exist:
   - `users`
   - `interviews`
   - `questions`
   - `responses`
   - `evaluations`

### Step 4: Check Row Level Security (RLS)

The main issue is often RLS policies blocking queries!

1. Go to **Authentication → Policies** in Supabase
2. Check if RLS is enabled on `interviews` table
3. If RLS is blocking, you have two options:

**Option A: Temporarily disable RLS for testing**
```sql
ALTER TABLE interviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

**Option B: Add policy for anonymous access (NOT for production!)**
```sql
CREATE POLICY "Allow all for demo" ON interviews
  FOR ALL USING (true);

CREATE POLICY "Allow all for demo" ON users
  FOR ALL USING (true);
```

### Step 5: Add Sample Data

If tables are empty, add test data:

```sql
-- Insert demo user
INSERT INTO users (id, email, full_name, subscription_tier) 
VALUES ('demo-user-id', 'demo@example.com', 'Demo User', 'free')
ON CONFLICT (id) DO NOTHING;

-- Insert sample interviews
INSERT INTO interviews (id, user_id, job_role, experience_level, status, overall_score, created_at)
VALUES 
  (gen_random_uuid(), 'demo-user-id', 'Software Engineer', '3-5', 'completed', 85, NOW() - INTERVAL '15 days'),
  (gen_random_uuid(), 'demo-user-id', 'Product Manager', '3-5', 'completed', 76, NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), 'demo-user-id', 'Data Scientist', '1-3', 'in_progress', NULL, NOW() - INTERVAL '5 days')
ON CONFLICT DO NOTHING;
```

### Step 6: Check Browser Console

Open browser console (F12) and visit dashboard:
- Look for `📊 Dashboard API called` logs
- Check for `✅ Using real data from database` or errors
- Check Network tab for API responses

### Common Issues

**Issue 1: "Supabase credentials not configured"**
- ✅ Check `.env.local` exists and has correct values
- ✅ Restart dev server
- ✅ Check file is in `interview-platform/.env.local` (not root folder)

**Issue 2: "Error fetching interviews" with RLS error**
- ✅ RLS policies are blocking access
- ✅ Temporarily disable RLS or add permissive policy
- ✅ Or add proper authentication

**Issue 3: "No data found"**
- ✅ Tables exist but are empty
- ✅ Add sample data using SQL above
- ✅ Check user_id matches ('demo-user-id')

**Issue 4: Connection works but still shows mock data**
- ✅ Check browser console for API errors
- ✅ Verify API endpoint returns real data: `http://localhost:3000/api/dashboard/stats`
- ✅ Check if `user_id` matches data in database

### Test Commands

**Check API directly:**
```bash
curl http://localhost:3000/api/test-connection
curl http://localhost:3000/api/dashboard/stats
```

**Check environment variables loaded:**
```bash
# In Node.js console or API route
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Debug Mode

The API now includes debug info. Check:
- Server console logs (terminal)
- Browser Network tab (API responses)
- Browser Console (client logs)

All show detailed connection status!
