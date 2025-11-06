"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Video, Pause, Square, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock questions for demonstration
const questions = [
  {
    id: 1,
    text: "Tell me about yourself and why you're interested in this Software Engineer position.",
    type: "behavioral",
    duration: 120, // 2 minutes
  },
  {
    id: 2,
    text: "Describe a challenging technical problem you solved and the approach you took.",
    type: "technical",
    duration: 180, // 3 minutes
  },
  {
    id: 3,
    text: "How do you handle working with a tight deadline and multiple competing priorities?",
    type: "behavioral",
    duration: 120,
  },
];

export default function StartInterviewPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions[0].duration);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Start countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].duration);
    } else {
      router.push("/dashboard/interviews/new/review");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Interview Session
        </h1>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Camera Preview */}
          <Card className="bg-black aspect-video flex items-center justify-center">
            <div className="text-white text-center">
              <Video className="h-16 w-16 mx-auto mb-4" />
              <p>Camera Preview</p>
              <p className="text-sm text-gray-400 mt-2">
                {isRecording ? "Recording..." : "Camera will start here"}
              </p>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Remaining</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatTime(timeLeft)}
                </p>
              </div>
              <div className="flex space-x-2">
                {!isRecording ? (
                  <Button size="lg" onClick={handleStartRecording}>
                    <Video className="h-5 w-5 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    {isPaused ? (
                      <Button size="lg" variant="outline" onClick={() => setIsPaused(false)}>
                        <Video className="h-5 w-5 mr-2" />
                        Resume
                      </Button>
                    ) : (
                      <Button size="lg" variant="outline" onClick={() => setIsPaused(true)}>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button size="lg" variant="outline" onClick={handleStopRecording}>
                      <Square className="h-5 w-5 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Button onClick={handleNext} size="lg" className="w-full">
              {currentQuestion === questions.length - 1 ? "Finish Interview" : "Next Question"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {question.type}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-gray-700 leading-relaxed">{question.text}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Tips for answering:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be specific and use examples</li>
                <li>• Structure your thoughts clearly</li>
                <li>• Show enthusiasm and confidence</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

