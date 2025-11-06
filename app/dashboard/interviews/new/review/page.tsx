"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Download, Share2 } from "lucide-react";
import Link from "next/link";

export default function InterviewReviewPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Interview Complete!
        </h1>
        <p className="text-gray-600">
          Your responses have been recorded. AI evaluation in progress.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Evaluation</h3>
              <p className="text-sm text-gray-600">
                Your responses are being analyzed by our AI evaluation engine.
                Processing time: 5-15 minutes.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Detailed Report</h3>
              <p className="text-sm text-gray-600">
                You'll receive a comprehensive PDF report with scores,
                feedback, and improvement recommendations.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Learning Plan</h3>
              <p className="text-sm text-gray-600">
                Get a personalized learning plan based on your performance
                with actionable next steps.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Link href="/dashboard/interviews" className="flex-1">
          <Button variant="outline" className="w-full">
            View All Interviews
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full">Go to Dashboard</Button>
        </Link>
      </div>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            While You Wait
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            Check out our practice resources and question bank to keep improving.
          </p>
          <Button variant="outline" size="sm">
            Explore Resources
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

