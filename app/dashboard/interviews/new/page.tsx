"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const jobRoles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Data Analyst",
  "DevOps Engineer",
  "UX Designer",
  "Marketing Manager",
  "Sales Executive",
  "Business Analyst",
  "Other",
];

const experienceLevels = [
  { label: "Fresher", value: "fresher" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5+ years", value: "5+" },
];

export default function NewInterviewPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobRole: "",
    experienceLevel: "",
    jobDescription: "",
    resume: null as File | null,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (formData.jobRole && formData.experienceLevel) {
        setStep(2);
      }
    } else if (step === 2) {
      if (formData.jobDescription) {
        setIsGenerating(true);
        // Simulate AI question generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGenerating(false);
        router.push("/dashboard/interviews/new/start");
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/interviews"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Interviews
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Create New Interview
        </h1>
        <p className="text-gray-600 mt-2">
          Step {step} of 2: {step === 1 ? "Job Details" : "Job Description"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Tell us about your target role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Role
                </label>
                <select
                  value={formData.jobRole}
                  onChange={(e) => handleChange("jobRole", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                >
                  <option value="">Select a job role</option>
                  {jobRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => handleChange("experienceLevel", level.value)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        formData.experienceLevel === level.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium text-gray-900">
                        {level.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume (Optional but Recommended)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, resume: file });
                      }
                    }}
                  />
                  <label htmlFor="resume-upload">
                    <Button type="button" variant="outline">
                      Choose File
                    </Button>
                  </label>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-green-600">
                      {formData.resume.name} uploaded
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste or describe the job description
                </label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) =>
                    handleChange("jobDescription", e.target.value)
                  }
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter the job description here..."
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  This helps our AI generate relevant interview questions
                </p>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" size="lg" disabled={isGenerating}>
                  {isGenerating ? "Generating Questions..." : "Generate Interview"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}

