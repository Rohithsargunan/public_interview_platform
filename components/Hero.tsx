"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              AI-Powered Interview Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ace Your Next Interview with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Practice</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized mock interviews tailored to your role, receive comprehensive AI-powered feedback, 
            and track your progress with detailed analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="group">
                Start Free Interview
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="group">
              <PlayCircle className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            ✓ No credit card required • ✓ 1 free interview • ✓ AI-powered feedback
          </p>
        </div>
      </div>
    </section>
  );
}

