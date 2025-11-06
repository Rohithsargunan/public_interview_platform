"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileText, TrendingUp, Award, Target } from "lucide-react";
import Link from "next/link";

interface Interview {
  id: string;
  job_role: string;
  status: string;
  overall_score: number | null;
  created_at: string;
}

interface Stats {
  interviewsCompleted: number;
  averageScore: number;
  improvementRate: number;
  skillsMastered: number;
}

export default function DashboardPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [stats, setStats] = useState<Stats>({
    interviewsCompleted: 0,
    averageScore: 0,
    improvementRate: 0,
    skillsMastered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Try API call first for real data
      const response = await fetch("/api/dashboard/stats");
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Using real data from database:", data);
        setStats(data.stats);
        setInterviews(data.recentInterviews);
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
        },
        {
          id: "2",
          job_role: "Product Manager",
          status: "completed",
          overall_score: 76,
          created_at: "2024-01-10T10:00:00Z",
        },
        {
          id: "3",
          job_role: "Data Scientist",
          status: "in_progress",
          overall_score: null,
          created_at: "2024-01-05T10:00:00Z",
        },
      ];

      const mockStats: Stats = {
        interviewsCompleted: 12,
        averageScore: 78,
        improvementRate: 15,
        skillsMastered: 5,
      };

      setInterviews(mockInterviews);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Continue your interview preparation journey
        </p>
        {error && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Database Status:</strong> {error}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Follow the setup guide in DATABASE_SETUP_REAL.md to connect to Supabase
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Interviews Completed
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsCompleted}</div>
            <p className="text-xs text-green-600 mt-1">
              {stats.interviewsCompleted > 0 ? "+3 this month" : "Start your first interview"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Score
            </CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-green-600 mt-1">
              {stats.improvementRate > 0 ? `+${stats.improvementRate}% improvement` : "No data yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Skill Level
            </CardTitle>
            <Award className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.averageScore >= 80 ? "Advanced" : 
               stats.averageScore >= 60 ? "Intermediate" : 
               stats.averageScore > 0 ? "Beginner" : "New"}
            </div>
            <p className="text-xs text-purple-600 mt-1">
              {stats.skillsMastered} skills mastered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Progress Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.averageScore > 0 ? Math.min(100, Math.round(stats.averageScore * 1.1)) : 0}%
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {stats.averageScore > 0 ? "On track" : "Get started"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviews.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No interviews yet</p>
                  <Link href="/dashboard/interviews/new">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Start your first interview →
                    </button>
                  </Link>
                </div>
              ) : (
                interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {interview.job_role}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(interview.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {interview.status === "completed" && interview.overall_score ? (
                        <>
                          <div className="text-lg font-bold text-blue-600">
                            {interview.overall_score}%
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Completed</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              {interviews.length > 0 && (
                <Link href="/dashboard/interviews">
                  <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View All Interviews →
                  </button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.averageScore > 0 ? (
                <>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Practice Communication Skills
                    </h3>
                    <p className="text-sm text-blue-800 mb-3">
                      Your recent interviews show room for improvement in articulation and clarity.
                    </p>
                    <Link
                      href="/dashboard/interviews/new"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start New Interview →
                    </Link>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">
                      Review Technical Concepts
                    </h3>
                    <p className="text-sm text-purple-800 mb-3">
                      Explore our question bank for technical interview preparation.
                    </p>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Browse Questions →
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Welcome to InterviewAI!
                  </h3>
                  <p className="text-sm text-green-800 mb-3">
                    Start your interview preparation journey with your first mock interview.
                  </p>
                  <Link
                    href="/dashboard/interviews/new"
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Create Your First Interview →
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
