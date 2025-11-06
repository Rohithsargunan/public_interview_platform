import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Get user ID from headers (in real app, this would come from auth)
    // For now, try to get from query params or use demo
    const userId = request.nextUrl.searchParams.get("userId") || 
                   request.headers.get("x-user-id") || 
                   "demo-user-id";

    console.log("📊 Dashboard API called - User ID:", userId);
    console.log("🔌 Supabase client status:", supabase ? "Connected" : "Not configured");

    // If Supabase is not configured, return mock data
    if (!supabase) {
      console.warn("⚠️ Returning mock data - Supabase not configured");
      const mockStats = {
        interviewsCompleted: 12,
        averageScore: 78,
        improvementRate: 15,
        skillsMastered: 5,
      };

      const mockInterviews = [
        {
          id: "1",
          job_role: "Software Engineer",
          status: "completed",
          overall_score: 85,
          created_at: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          job_role: "Product Manager",
          status: "completed",
          overall_score: 76,
          created_at: "2024-01-10T10:00:00Z",
        },
      ];

      return NextResponse.json({
        stats: mockStats,
        recentInterviews: mockInterviews,
        debug: { supabaseConfigured: false, userId },
      });
    }

    // Fetch user's interview statistics
    console.log("🔍 Querying interviews for user:", userId);
    const { data: interviews, error: interviewsError } = await supabase
      .from("interviews")
      .select("overall_score, created_at, status")
      .eq("user_id", userId);

    if (interviewsError) {
      console.error("❌ Error fetching interviews:", interviewsError);
      console.error("   Error details:", {
        message: interviewsError.message,
        code: interviewsError.code,
        details: interviewsError.details,
        hint: interviewsError.hint,
      });
      return NextResponse.json({ 
        error: "Failed to fetch interviews",
        details: interviewsError.message,
        debug: { userId, supabaseConnected: true }
      }, { status: 500 });
    }

    console.log("✅ Found interviews:", interviews?.length || 0);

    // Calculate statistics
    const completedInterviews = interviews?.filter(i => i.status === "completed") || [];
    const totalInterviews = interviews?.length || 0;
    const averageScore = completedInterviews.length > 0 
      ? Math.round(completedInterviews.reduce((sum, i) => sum + (i.overall_score || 0), 0) / completedInterviews.length)
      : 0;

    // Calculate improvement rate (compare last month to previous month)
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    
    const lastMonthInterviews = completedInterviews.filter(i => 
      new Date(i.created_at) >= lastMonth && new Date(i.created_at) < now
    );
    const previousMonthInterviews = completedInterviews.filter(i => 
      new Date(i.created_at) >= twoMonthsAgo && new Date(i.created_at) < lastMonth
    );

    const lastMonthAvg = lastMonthInterviews.length > 0 
      ? lastMonthInterviews.reduce((sum, i) => sum + (i.overall_score || 0), 0) / lastMonthInterviews.length
      : 0;
    const previousMonthAvg = previousMonthInterviews.length > 0 
      ? previousMonthInterviews.reduce((sum, i) => sum + (i.overall_score || 0), 0) / previousMonthInterviews.length
      : 0;

    const improvementRate = previousMonthAvg > 0 
      ? Math.round(((lastMonthAvg - previousMonthAvg) / previousMonthAvg) * 100)
      : 0;

    // Fetch recent interviews
    const { data: recentInterviews, error: recentError } = await supabase
      .from("interviews")
      .select("id, job_role, created_at, status, overall_score")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (recentError) {
      console.error("❌ Error fetching recent interviews:", recentError);
      return NextResponse.json({ 
        error: "Failed to fetch recent interviews",
        details: recentError.message 
      }, { status: 500 });
    }

    console.log("✅ Found recent interviews:", recentInterviews?.length || 0);

    const stats = {
      interviewsCompleted: totalInterviews,
      averageScore,
      improvementRate: Math.max(0, improvementRate),
      skillsMastered: Math.min(5, Math.floor(averageScore / 20)), // Estimate based on score
    };

    return NextResponse.json({
      stats,
      recentInterviews: recentInterviews || [],
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

