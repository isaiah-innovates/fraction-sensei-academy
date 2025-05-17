
import React, { useState, useEffect } from "react";
import { AppHeader } from "@/components/app-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const navigate = useNavigate();
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  
  useEffect(() => {
    // Try to get diagnostic results from session storage
    const savedResults = sessionStorage.getItem("diagnosticResults");
    if (savedResults) {
      setDiagnosticResults(JSON.parse(savedResults));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 font-math text-center">Your Learning Progress</h1>
          
          {diagnosticResults ? (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>Diagnostic Results</CardTitle>
                <CardDescription>
                  Completed on {new Date(diagnosticResults.timestamp).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Score:</span>
                    <span className="font-bold">{diagnosticResults.score}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Correct Answers:</span>
                    <span>{diagnosticResults.correctAnswers} out of {diagnosticResults.totalQuestions}</span>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Recommended Focus Areas:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Understanding how denominators affect fraction size</li>
                      <li>Using benchmark fractions (0, 1/2, 1) for comparison</li>
                      <li>Visual representation of fractions on number lines</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription>
                  You haven't taken the diagnostic assessment yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Take the diagnostic assessment to track your progress and receive personalized recommendations.</p>
                <Button onClick={() => navigate("/diagnostic")}>
                  Start Diagnostic
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visual Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-2xl font-bold text-brainlift-blue">
                    {diagnosticResults ? "Unlocked" : "Locked"}
                  </span>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => navigate("/learn")}>
                  View Content
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Number Lines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-2xl font-bold text-brainlift-teal">
                    {diagnosticResults ? "Unlocked" : "Locked"}
                  </span>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => navigate("/learn")}>
                  View Content
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Comparison Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-2xl font-bold text-brainlift-orange">
                    {diagnosticResults ? "Unlocked" : "Locked"}
                  </span>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => navigate("/learn")}>
                  View Content
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
