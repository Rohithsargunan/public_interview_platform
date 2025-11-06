"use client";

import { Card } from "@/components/ui/Card";
import { UserPlus, FileText, Video, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up in seconds and select your target job role, experience level, and upload your resume.",
  },
  {
    number: "02",
    icon: FileText,
    title: "AI Generates Questions",
    description:
      "Our AI analyzes your profile and generates personalized interview questions tailored to your role.",
  },
  {
    number: "03",
    icon: Video,
    title: "Record Your Responses",
    description:
      "Answer each question on camera in a distraction-free environment with our intuitive interface.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Get Detailed Feedback",
    description:
      "Receive comprehensive AI-powered analysis with actionable insights and improvement recommendations.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to interview excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="absolute -top-4 -left-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

