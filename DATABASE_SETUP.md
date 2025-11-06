# Database Setup Guide

## Current Status: ❌ No Database Connected

The application currently uses **mock data only**. All data is static and doesn't persist.

## Quick Setup Options

### Option 1: Supabase (Recommended - Easiest)

1. **Sign up at [supabase.com](https://supabase.com)**

2. **Install Supabase client:**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Create environment variables:**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Initialize Supabase client:**
   Create `lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

5. **Create database tables** in Supabase SQL editor:
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email VARCHAR(255) UNIQUE NOT NULL,
     full_name VARCHAR(255),
     password_hash VARCHAR(255),
     subscription_tier VARCHAR(50) DEFAULT 'free',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Interviews table
   CREATE TABLE interviews (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES users(id),
     job_role VARCHAR(255),
     experience_level VARCHAR(50),
     job_description TEXT,
     status VARCHAR(50) DEFAULT 'draft',
     overall_score DECIMAL(5,2),
     created_at TIMESTAMP DEFAULT NOW(),
     completed_at TIMESTAMP
   );

   -- Questions table
   CREATE TABLE questions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     interview_id UUID REFERENCES interviews(id),
     question_number INT,
     question_text TEXT,
     question_type VARCHAR(50),
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Responses table
   CREATE TABLE responses (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     question_id UUID REFERENCES questions(id),
     video_url TEXT,
     transcript TEXT,
     duration_seconds INT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Evaluations table
   CREATE TABLE evaluations (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     response_id UUID REFERENCES responses(id),
     communication_score DECIMAL(5,2),
     content_score DECIMAL(5,2),
     behavioral_score DECIMAL(5,2),
     nonverbal_score DECIMAL(5,2),
     overall_score DECIMAL(5,2),
     feedback JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Option 2: PostgreSQL with Prisma

1. **Install Prisma:**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Configure `.env`:**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/interviewai"
   ```

3. **Define schema** in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id        String   @id @default(uuid())
     email     String   @unique
     name      String?
     interviews Interview[]
   }

   model Interview {
     id          String     @id @default(uuid())
     userId      String
     jobRole     String
     status      String
     user        User       @relation(fields: [userId], references: [id])
     questions   Question[]
     createdAt   DateTime   @default(now())
   }

   model Question {
     id          String   @id @default(uuid())
     interviewId String
     text        String
     interview   Interview @relation(fields: [interviewId], references: [id])
   }
   ```

4. **Run migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### Option 3: SQLite (Local Development)

Perfect for local testing without external database.

1. **Install:**
   ```bash
   npm install better-sqlite3 @types/better-sqlite3
   ```

2. **Create database helper:**
   Create `lib/db.ts`:
   ```typescript
   import Database from 'better-sqlite3';

   const db = new Database('interviewai.db');

   // Initialize tables
   db.exec(`
     CREATE TABLE IF NOT EXISTS users (
       id TEXT PRIMARY KEY,
       email TEXT UNIQUE NOT NULL,
       name TEXT
     );

     CREATE TABLE IF NOT EXISTS interviews (
       id TEXT PRIMARY KEY,
       user_id TEXT REFERENCES users(id),
       job_role TEXT,
       status TEXT
     );
   `);

   export default db;
   ```

## What You Need to Replace

### Current Mock Data (Static)
- **Dashboard:** Stats are hardcoded in `app/dashboard/page.tsx`
- **Interviews List:** Data in `app/dashboard/interviews/page.tsx`
- **Interview Details:** Mock data in `app/dashboard/interviews/[id]/page.tsx`
- **API Routes:** Mock responses in `app/api/`

### Replace With Real Database Calls

**Example: Before (Mock Data)**
```typescript
const interviews = [
  { id: 1, role: "Software Engineer", ... }
];
```

**Example: After (Database)**
```typescript
// For Supabase
const { data: interviews } = await supabase
  .from('interviews')
  .select('*')
  .eq('user_id', userId);

// For Prisma
const interviews = await prisma.interview.findMany({
  where: { userId }
});
```

## Recommended Approach

**For MVP: Start with Supabase** because:
- ✅ Free tier available
- ✅ Built-in authentication
- ✅ Real-time capabilities
- ✅ Easy to set up
- ✅ PostgreSQL under the hood
- ✅ Auto-generated REST API

## Next Steps

1. Choose your database solution
2. Set up the connection
3. Create tables/schema
4. Replace mock data with database queries
5. Add authentication
6. Test CRUD operations

**Need help?** I can help you implement the database connection for any of these options!

