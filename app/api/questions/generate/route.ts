import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobRole, experienceLevel, jobDescription, resumeKeywords } = body;

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

