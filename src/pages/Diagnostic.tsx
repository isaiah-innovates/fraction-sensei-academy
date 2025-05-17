
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FractionDisplay } from "@/components/fraction-display";
import { FractionComparisonCard } from "@/components/fraction-comparison-card";
import { NumberLine } from "@/components/number-line";
import { generateFractionPair } from "@/utils/fraction-utils";
import { useToast } from "@/components/ui/use-toast";

const Diagnostic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [results, setResults] = useState<Array<{ type: string; isCorrect: boolean }>>([]);
  const [currentQuestion, setCurrentQuestion] = useState<{
    type: string;
    fraction1: { numerator: number; denominator: number };
    fraction2: { numerator: number; denominator: number };
  } | null>(null);

  // Total questions in the diagnostic
  const totalQuestions = 5;
  
  const generateQuestion = (index: number) => {
    // Different types of questions based on step
    const types = ["same-denominator", "same-numerator", "benchmark", "random", "benchmark"];
    const type = types[index % types.length];
    
    const pair = generateFractionPair(
      type as "same-denominator" | "same-numerator" | "benchmark" | "random", 
      "medium"
    );
    
    setCurrentQuestion({
      type,
      fraction1: pair.fraction1,
      fraction2: pair.fraction2
    });
  };
  
  const handleStart = () => {
    setIsStarted(true);
    generateQuestion(0);
  };
  
  const handleAnswer = (isCorrect: boolean) => {
    // Record the result
    if (currentQuestion) {
      setResults([...results, { type: currentQuestion.type, isCorrect }]);
    }
    
    // Move to next question or finish
    setTimeout(() => {
      if (step < totalQuestions - 1) {
        setStep(step + 1);
        generateQuestion(step + 1);
      } else {
        // Calculate results
        const correctAnswers = results.filter(r => r.isCorrect).length + (isCorrect ? 1 : 0);
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Store diagnostic results in sessionStorage
        const diagnosticData = {
          score: percentage,
          correctAnswers,
          totalQuestions,
          results: [...results, { type: currentQuestion?.type || "", isCorrect }],
          timestamp: new Date().toISOString()
        };
        sessionStorage.setItem("diagnosticResults", JSON.stringify(diagnosticData));
        
        // Show completion toast
        toast({
          title: "Diagnostic Complete!",
          description: `You scored ${percentage}% (${correctAnswers}/${totalQuestions} correct)`,
          duration: 5000,
        });
        
        // Navigate to results or learning modules
        navigate("/learn");
      }
    }, 1500);
  };
  
  // Calculate progress percentage
  const progressPercentage = isStarted ? ((step + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {!isStarted ? (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-math">Fraction Comparison Diagnostic</CardTitle>
                <CardDescription>
                  Let's see what you know about comparing fractions! This quick diagnostic will help personalize your learning path.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">What to expect:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>5 fraction comparison questions</li>
                    <li>Immediate feedback after each answer</li>
                    <li>Takes about 3-5 minutes to complete</li>
                    <li>Results will guide your personalized learning path</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button size="lg" onClick={handleStart} className="bg-brainlift-blue hover:bg-blue-600">
                  Start Diagnostic
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Question {step + 1} of {totalQuestions}</span>
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {currentQuestion && (
                <FractionComparisonCard
                  fraction1={currentQuestion.fraction1}
                  fraction2={currentQuestion.fraction2}
                  onResult={handleAnswer}
                  showExplanation={false}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Diagnostic;
