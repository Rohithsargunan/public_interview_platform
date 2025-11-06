"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface DiagnosticResult {
  test: string;
  status: "pass" | "fail" | "loading";
  message: string;
}

export default function DiagnosticPage() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setLoading(true);
    const diagnostics: DiagnosticResult[] = [];

    // Test 1: Environment variables
    diagnostics.push({
      test: "Environment Variables",
      status: "loading",
      message: "Checking .env.local file...",
    });

    // Test 2: Supabase connection
    try {
      const connectionRes = await fetch("/api/test-connection");
      const connectionData = await connectionRes.json();
      
      if (connectionData.connected) {
        diagnostics.push({
          test: "Supabase Connection",
          status: "pass",
          message: connectionData.message || "Successfully connected",
        });
      } else {
        diagnostics.push({
          test: "Supabase Connection",
          status: "fail",
          message: connectionData.message || connectionData.error || "Connection failed",
        });
      }
    } catch (error: any) {
      diagnostics.push({
        test: "Supabase Connection",
        status: "fail",
        message: error.message || "Could not test connection",
      });
    }

    // Test 3: Database query
    try {
      const statsRes = await fetch("/api/dashboard/stats");
      const statsData = await statsRes.json();
      
      if (statsData.error) {
        diagnostics.push({
          test: "Database Query",
          status: "fail",
          message: statsData.details || statsData.error || "Query failed",
        });
      } else if (statsData.debug?.supabaseConfigured === false) {
        diagnostics.push({
          test: "Database Query",
          status: "fail",
          message: "Supabase not configured - check environment variables",
        });
      } else {
        diagnostics.push({
          test: "Database Query",
          status: "pass",
          message: `Found ${statsData.stats?.interviewsCompleted || 0} interviews`,
        });
      }
    } catch (error: any) {
      diagnostics.push({
        test: "Database Query",
        status: "fail",
        message: error.message || "Could not query database",
      });
    }

    // Test 4: RLS Check
    try {
      const interviewsRes = await fetch("/api/interviews");
      const interviewsData = await interviewsRes.json();
      
      if (interviewsData.error) {
        if (interviewsData.code?.includes("PGRST") || interviewsData.message?.includes("RLS")) {
          diagnostics.push({
            test: "Row Level Security",
            status: "fail",
            message: "RLS policies are blocking access. See DEBUG_CONNECTION.md for fix",
          });
        } else {
          diagnostics.push({
            test: "Row Level Security",
            status: "fail",
            message: interviewsData.details || interviewsData.error,
          });
        }
      } else {
        diagnostics.push({
          test: "Row Level Security",
          status: "pass",
          message: "RLS policies allow access",
        });
      }
    } catch (error: any) {
      diagnostics.push({
        test: "Row Level Security",
        status: "fail",
        message: error.message || "Could not test RLS",
      });
    }

    setResults(diagnostics);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Database Connection Diagnostics
        </h1>
        <p className="text-gray-600">
          Testing Supabase connection and database access
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Running diagnostics...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start p-4 rounded-lg border-2 ${
                    result.status === "pass"
                      ? "bg-green-50 border-green-200"
                      : result.status === "fail"
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="mr-4 mt-1">
                    {result.status === "pass" ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : result.status === "fail" ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {result.test}
                    </h3>
                    <p className="text-sm text-gray-600">{result.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              ✅ If all tests pass: Your database is connected and working!
            </li>
            <li>
              ❌ If connection fails: Check your `.env.local` file has correct
              Supabase credentials
            </li>
            <li>
              ❌ If RLS fails: See <code className="bg-gray-100 px-2 py-1 rounded">DEBUG_CONNECTION.md</code> for
              instructions to fix Row Level Security policies
            </li>
            <li>
              📖 Check server console for detailed error messages
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
