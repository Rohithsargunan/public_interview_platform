import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if we have valid credentials
let supabase: any = null

if (supabaseUrl && supabaseAnonKey && 
    supabaseUrl.startsWith('http') && 
    supabaseAnonKey.length > 20) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client initialized successfully')
  } catch (error) {
    console.error('❌ Error initializing Supabase client:', error)
  }
} else {
  console.warn('⚠️ Supabase credentials not configured. Check your .env.local file.')
  console.warn('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing')
  console.warn('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Set' : '✗ Missing')
}

export { supabase }

