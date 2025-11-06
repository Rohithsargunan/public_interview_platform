"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";

export default function ProgressPage() {
  const progressData = {
    overallScore: 78,
    interviewsCompleted: 12,
    averageScore: 76,
    improvementRate: 15,
    skillsMastered: 5,
  };

  const categoryProgress = [
    { name: "Communication", score: 82, target: 90 },
    { name: "Content Quality", score: 79, target: 85 },
    { name: "Behavioral", score: 75, target: 85 },
    { name: "Non-Verbal", score: 74, target: 80 },
  ];

  const recentImprovements = [
    { skill: "Communication", improvement: "+8%", trend: "up" },
    { skill: "Technical Depth", improvement: "+12%", trend: "up" },
    { skill: "Confidence", improvement: "+6%", trend: "up" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="text-gray-600 mt-2">Monitor your interview improvement journey</p>
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

