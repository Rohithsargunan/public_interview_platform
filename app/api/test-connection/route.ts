import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Test Supabase connection
    console.log("🔍 Testing Supabase connection...");
    
    if (!supabase) {
      return NextResponse.json({
        connected: false,
        message: "Supabase client not initialized",
        checkEnv: "Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
      });
    }

    // Test connection by querying a simple table
    const { data, error } = await supabase
      .from("interviews")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Database connection error:", error);
      return NextResponse.json({
        connected: false,
        error: error.message,
        code: error.code,
        hint: error.hint,
        details: error.details
      });
    }

    // Check if tables exist
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_schema_tables');

    return NextResponse.json({
      connected: true,
      message: "✅ Successfully connected to Supabase",
      hasData: data ? true : false,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("❌ Connection test error:", error);
    return NextResponse.json({
      connected: false,
      error: error.message || "Unknown error"
    }, { status: 500 });
  }
}
