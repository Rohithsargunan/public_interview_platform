import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcript, question, jobRole, responseId } = body;

    // Verify authentication if Supabase is configured
    if (supabase) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ 
          error: "No authorization token provided",
          message: "Please log in to get evaluation"
        }, { status: 401 });
      }

      const token = authHeader.substring(7);
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        return NextResponse.json({ 
          error: "Invalid or expired token",
          message: "Please log in again"
        }, { status: 401 });
      }
    }

    // Mock evaluation response
    // In production, integrate with OpenAI GPT-4 for actual evaluation
    const evaluation = {
      communicationScore: 85,
      contentScore: 78,
      behavioralScore: 82,
      nonverbalScore: 80,
      overallScore: 81,
      strengths: [
        "Clear and articulate communication",
        "Provided specific examples from experience",
        "Demonstrated confidence in delivery",
      ],
      improvements: [
        "Could reduce filler words (um, uh)",
        "Add more technical depth to responses",
        "Improve eye contact consistency",
      ],
      feedback: {
        communication: "Your communication was clear and well-structured. Try to minimize filler words for even better impact.",
        content: "Good use of examples, but could go deeper into technical specifics relevant to the role.",
        behavioral: "Strong demonstration of teamwork and problem-solving. Consider using the STAR method more consistently.",
      },
      recommendations: [
        "Practice technical deep-dives on common interview topics",
        "Work on eliminating filler words",
        "Prepare more STAR method examples",
      ],
    };

    return NextResponse.json(evaluation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to evaluate response" },
      { status: 500 }
    );
  }
}

