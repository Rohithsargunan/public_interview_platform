"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function TestConnectionPage() {
  const { user, loading } = useAuth();
  const [testResults, setTestResults] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);

  const runConnectionTest = async () => {
    setTestLoading(true);
    try {
      let headers = {};
      
      if (user && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers = { 'Authorization': `Bearer ${session.access_token}` };
        }
      }

      const response = await fetch("/api/auth-test", { headers });
      const data = await response.json();
      setTestResults(data);
    } catch (error: any) {
      setTestResults({ error: error?.message || "Unknown error" });
    } finally {
      setTestLoading(false);
    }
  };

  const testDashboardAPI = async () => {
    if (!user || !supabase) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      const response = await fetch("/api/dashboard/stats", {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      
      const data = await response.json();
      console.log("Dashboard API Response:", data);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Database Connection Test</h1>
      
      <div className="grid gap-6">
        {/* Auth Status */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Supabase Client:</strong> {supabase ? "✅ Connected" : "❌ Not configured"}</p>
              <p><strong>User:</strong> {user ? `✅ ${user.email}` : "❌ Not logged in"}</p>
              <p><strong>User ID:</strong> {user?.id || "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Test Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={runConnectionTest} 
              disabled={testLoading}
              className="mr-4"
            >
              {testLoading ? "Testing..." : "Test Database Connection"}
            </Button>
            
            <Button 
              onClick={testDashboardAPI} 
              disabled={!user}
              variant="outline"
            >
              Test Dashboard API
            </Button>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}