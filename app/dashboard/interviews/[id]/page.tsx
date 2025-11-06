"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, Share2, Calendar, Target, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface InterviewDetail {
  id: string;
  job_role: string;
  status: string;
  overall_score: number;
  created_at: string;
  categories: {
    communication: number;
    content: number;
    behavioral: number;
    nonverbal: number;
  };
  questions: Array<{
    id: string;
    question: string;
    score: number;
    feedback: string;
  }>;
}

export default function InterviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [interview, setInterview] = useState<InterviewDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = params as { id: string };
    fetchInterviewDetail(id);
  }, [params]);

  const fetchInterviewDetail = async (id: string) => {
    try {
      // TODO: Replace with real Supabase query when .env.local is configured
      // const { data: interview, error } = await supabase
      //   .from('interviews')
      //   .select(`
      //     *,
      //     questions (
      //       *,
      //       responses (
      //         *,
      //         evaluations (*)
      //       )
      //     )
      //   `)
      //   .eq('id', id)
      //   .single();

      // Mock data for now
      const mockInterview: InterviewDetail = {
        id: id,
        job_role: "Software Engineer",
        status: "completed",
        overall_score: 85,
        created_at: "2024-01-15T10:00:00Z",
        categories: {
          communication: 88,
          content: 82,
          behavioral: 85,
          nonverbal: 80,
        },
        questions: [
          {
            id: "1",
            question: "Tell me about yourself and why you're interested in this position.",
            score: 88,
            feedback: "Excellent communication and clear structure. Used specific examples effectively.",
          },
          {
            id: "2",
            question: "Describe a challenging technical problem you solved.",
            score: 85,
            feedback: "Good technical depth. Could elaborate more on the problem-solving process.",
          },
        ],
      };

      setInterview(mockInterview);
    } catch (error) {
      console.error("Error fetching interview detail:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview not found</h2>
        <p className="text-gray-600">The interview you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{interview.job_role}</h1>
          <p className="text-gray-600 mt-2">Interview #{interview.id}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Score</span>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-4xl font-bold text-blue-600">
              {interview.overall_score}%
            </div>
            <p className="text-sm text-green-600 mt-2">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              Above Average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Status</span>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">Completed</div>
            <p className="text-sm text-gray-600 mt-2">
              {new Date(interview.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Questions</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {interview.questions.length}
            </div>
            <p className="text-sm text-gray-600 mt-2">All answered</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(interview.categories).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {key}
                  </span>
                  <span className="text-sm text-gray-600">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question-by-Question Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {interview.questions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
                    Question {index + 1}
                  </span>
                  <p className="text-gray-900 font-medium mb-2">{q.question}</p>
                  <p className="text-sm text-gray-600">{q.feedback}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {q.score}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
