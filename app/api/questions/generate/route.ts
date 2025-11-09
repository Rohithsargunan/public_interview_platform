import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobRole, experienceLevel, jobDescription, resumeKeywords, interviewId } = body;

    // Verify authentication if Supabase is configured
    if (supabase) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ 
          error: "No authorization token provided",
          message: "Please log in to generate questions"
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

    // This is a mock implementation
    // In production, you would integrate with OpenAI or similar service
    const mockQuestions = [
      {
        id: 1,
        text: `Tell me about yourself and why you're interested in this ${jobRole} position.`,
        type: "behavioral",
        difficulty: "medium",
        expectedDuration: 120,
      },
      {
        id: 2,
        text: `Describe a challenging problem you've solved in your ${experienceLevel} years of experience and the approach you took.`,
        type: "technical",
        difficulty: "medium",
        expectedDuration: 180,
      },
      {
        id: 3,
        text: "How do you handle working under pressure and tight deadlines?",
        type: "behavioral",
        difficulty: "easy",
        expectedDuration: 120,
      },
      {
        id: 4,
        text: `What attracted you to apply for this ${jobRole} role?`,
        type: "behavioral",
        difficulty: "easy",
        expectedDuration: 120,
      },
      {
        id: 5,
        text: "Describe a time when you had to collaborate with a difficult team member.",
        type: "behavioral",
        difficulty: "medium",
        expectedDuration: 120,
      },
    ];

    return NextResponse.json({ questions: mockQuestions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}

