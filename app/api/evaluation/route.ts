import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transcript, question, jobRole } = body;

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

