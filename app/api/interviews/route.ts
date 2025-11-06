import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Get user ID from headers (in real app, this would come from auth)
    const userId = request.nextUrl.searchParams.get("userId") || 
                   request.headers.get("x-user-id") || 
                   "demo-user-id";

    console.log("📋 Interviews API called - User ID:", userId);
    console.log("🔌 Supabase client status:", supabase ? "Connected" : "Not configured");

    // If Supabase is not configured, return mock data
    if (!supabase) {
      console.warn("⚠️ Returning mock data - Supabase not configured");
      const mockInterviews = [
        {
          id: "1",
          job_role: "Software Engineer",
          status: "completed",
          overall_score: 85,
          created_at: "2024-01-15T10:00:00Z",
          total_questions: 5,
        },
        {
          id: "2",
          job_role: "Product Manager",
          status: "completed",
          overall_score: 76,
          created_at: "2024-01-10T10:00:00Z",
          total_questions: 5,
        },
        {
          id: "3",
          job_role: "Data Scientist",
          status: "in_progress",
          overall_score: null,
          created_at: "2024-01-05T10:00:00Z",
          total_questions: 5,
        },
      ];

      return NextResponse.json({ interviews: mockInterviews });
    }

    // Fetch user's interviews
    console.log("🔍 Querying interviews for user:", userId);
    const { data: interviews, error } = await supabase
      .from("interviews")
      .select("id, job_role, status, overall_score, created_at, total_questions")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching interviews:", error);
      console.error("   Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json({ 
        error: "Failed to fetch interviews",
        details: error.message,
        code: error.code,
        hint: error.hint,
        debug: { userId, supabaseConnected: true }
      }, { status: 500 });
    }

    console.log("✅ Found interviews:", interviews?.length || 0);

    return NextResponse.json({ interviews: interviews || [] });
  } catch (error) {
    console.error("Interviews API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobRole, experienceLevel, jobDescription, resumeUrl } = body;
    
    // Get user ID from headers (in real app, this would come from auth)
    const userId = request.headers.get("x-user-id") || "demo-user-id";

    // If Supabase is not configured, return mock response
    if (!supabase) {
      const mockInterview = {
        id: "mock-" + Date.now(),
        user_id: userId,
        job_role: jobRole,
        experience_level: experienceLevel,
        job_description: jobDescription,
        resume_used_url: resumeUrl,
        status: "draft",
        created_at: new Date().toISOString(),
      };

      return NextResponse.json({ interview: mockInterview });
    }

    // Create new interview
    const { data: interview, error } = await supabase
      .from("interviews")
      .insert({
        user_id: userId,
        job_role: jobRole,
        experience_level: experienceLevel,
        job_description: jobDescription,
        resume_used_url: resumeUrl,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating interview:", error);
      return NextResponse.json({ error: "Failed to create interview" }, { status: 500 });
    }

    return NextResponse.json({ interview });
  } catch (error) {
    console.error("Create interview API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

