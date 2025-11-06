"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlusCircle, FileText, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Interview {
  id: string;
  job_role: string;
  status: string;
  overall_score: number | null;
  created_at: string;
  total_questions: number;
}

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      // Try API call first for real data
      const response = await fetch("/api/interviews");
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Using real interviews from database:", data);
        setInterviews(data.interviews);
        setError(""); // Clear any previous errors
        return;
      }
      
      // If API fails, throw error to fall back to mock data
      throw new Error("API not available");
      
    } catch (error) {
      console.warn("⚠️ API not available, using mock data:", error);
      setError("Database not connected - showing sample data");
      
      // Fallback to mock data
      const mockInterviews: Interview[] = [
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

      setInterviews(mockInterviews);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Interviews</h1>
          <p className="text-gray-600 mt-2">
            Manage and review your interview sessions
          </p>
          {error && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Database Status:</strong> {error}
              </p>
            </div>
          )}
        </div>
        <Link href="/dashboard/interviews/new">
          <Button size="lg">
            <PlusCircle className="h-5 w-5 mr-2" />
            New Interview
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {interviews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No interviews yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your first interview to begin tracking your progress
              </p>
              <Link href="/dashboard/interviews/new">
                <Button size="lg">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create Your First Interview
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          interviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {interview.job_role}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          interview.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {interview.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(interview.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {interview.total_questions} questions
                      </div>
                    </div>
                  </div>
                  {interview.status === "completed" && interview.overall_score && (
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {interview.overall_score}%
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Above average
                      </div>
                    </div>
                  )}
                  <div className="ml-6">
                    <Link href={`/dashboard/interviews/${interview.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
