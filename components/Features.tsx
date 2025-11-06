"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Brain,
  Video,
  FileText,
  TrendingUp,
  Target,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Interviews",
    description:
      "Personalized interview questions tailored to your job role and experience level using advanced AI.",
  },
  {
    icon: Video,
    title: "Video Recording & Analysis",
    description:
      "Record your responses in a distraction-free environment with real-time feedback on your performance.",
  },
  {
    icon: FileText,
    title: "Comprehensive Feedback",
    description:
      "Get detailed analysis on communication, content quality, behavioral competencies, and non-verbal cues.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Track your improvement over time with detailed analytics and personalized learning plans.",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description:
      "Receive curated resources, practice exercises, and follow-up suggestions based on your performance.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Enterprise-grade security with encrypted storage and complete control over your data.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and insights to help you land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

