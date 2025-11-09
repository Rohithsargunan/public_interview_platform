import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing authenticated connection...");
    
    if (!supabase) {
      return NextResponse.json({
        connected: false,
        message: "Supabase client not initialized",
        checkEnv: "Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
      });
    }

    // Get user ID from authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Test basic connection without auth
      const { data, error } = await supabase
        .from("users")
        .select("count")
        .limit(1);

      if (error) {
        return NextResponse.json({
          connected: false,
          error: error.message,
          code: error.code,
          hint: "Database tables may not exist. Run the SQL schema in Supabase."
        });
      }

      return NextResponse.json({
        connected: true,
        message: "✅ Database connection successful (no auth)",
        tablesExist: true,
        needsAuth: true
      });
    }

    const token = authHeader.substring(7);

    // Test authenticated connection
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({
        connected: true,
        authenticated: false,
        error: "Invalid token",
        message: "Database connected but authentication failed"
      });
    }

    // Test user-specific query
    const { data: userInterviews, error: queryError } = await supabase
      .from("interviews")
      .select("count")
      .eq("user_id", user.id)
      .limit(1);

    if (queryError) {
      return NextResponse.json({
        connected: true,
        authenticated: true,
        userId: user.id,
        error: queryError.message,
        message: "Auth works but query failed"
      });
    }

    return NextResponse.json({
      connected: true,
      authenticated: true,
      userId: user.id,
      userEmail: user.email,
      message: "✅ Full authentication and database access working!",
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