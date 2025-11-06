"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GraduationCap, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">InterviewAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}

