"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

interface ProgressData {
  overallScore: number;
  interviewsCompleted: number;
  averageScore: number;
  improvementRate: number;
  skillsMastered: number;
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData>({
    overallScore: 0,
    interviewsCompleted: 0,
    averageScore: 0,
    improvementRate: 0,
    skillsMastered: 0,
  });
  const [categoryProgress, setCategoryProgress] = useState([
    { name: "Communication", score: 0, target: 90 },
    { name: "Content Quality", score: 0, target: 85 },
    { name: "Behavioral", score: 0, target: 85 },
    { name: "Non-Verbal", score: 0, target: 80 },
  ]);
  const [recentImprovements, setRecentImprovements] = useState([
    { skill: "Communication", improvement: "+0%", trend: "up" },
    { skill: "Content Quality", improvement: "+0%", trend: "up" },
    { skill: "Behavioral", improvement: "+0%", trend: "up" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchProgressData();
    }
  }, [user]);

  const fetchProgressData = async () => {
    if (!user || !supabase) {
      // Fallback to demo data if not authenticated
      setProgressData({
        overallScore: 78,
        interviewsCompleted: 12,
        averageScore: 76,
        improvementRate: 15,
        skillsMastered: 5,
      });
      setLoading(false);
      return;
    }

    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error("No valid session");
      }

      // Call progress API with authorization header
      const response = await fetch("/api/progress", {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Using real progress data from database:", data);
        setProgressData(data.progressData);
        setCategoryProgress(data.categoryProgress || categoryProgress);
        setRecentImprovements(data.recentImprovements || recentImprovements);
        setError(""); 
      } else {
        throw new Error(`API error: ${response.status}`);
      }
      
    } catch (error: any) {
      console.warn("⚠️ API not available, using demo data:", error);
      setError("Database not connected - showing sample data");
      
      // Fallback to demo data
      setProgressData({
        overallScore: 78,
        interviewsCompleted: 12,
        averageScore: 76,
        improvementRate: 15,
        skillsMastered: 5,
      });
      setCategoryProgress([
        { name: "Communication", score: 82, target: 90 },
        { name: "Content Quality", score: 79, target: 85 },
        { name: "Behavioral", score: 75, target: 85 },
        { name: "Non-Verbal", score: 74, target: 80 },
      ]);
      setRecentImprovements([
        { skill: "Communication", improvement: "+8%", trend: "up" },
        { skill: "Technical Depth", improvement: "+12%", trend: "up" },
        { skill: "Confidence", improvement: "+6%", trend: "up" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="text-gray-600 mt-2">Monitor your interview improvement journey</p>
        {error && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Data Status:</strong> {error}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Overall Score
            </CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressData.overallScore}%</div>
            <p className="text-xs text-green-600 mt-1">+{progressData.improvementRate}% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Interviews Completed
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressData.interviewsCompleted}</div>
            <p className="text-xs text-gray-600 mt-1">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressData.averageScore}%</div>
            <p className="text-xs text-blue-600 mt-1">Good progress!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Skills Mastered
            </CardTitle>
            <Award className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressData.skillsMastered}</div>
            <p className="text-xs text-purple-600 mt-1">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categoryProgress.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {category.score}% / {category.target}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Improvements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentImprovements.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.skill}</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {item.improvement}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

