
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FractionComparisonCard } from "@/components/fraction-comparison-card";
import { NumberLine } from "@/components/number-line";
import { generateFractionPair } from "@/utils/fraction-utils";
import { useToast } from "@/components/ui/use-toast";

const Practice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState<boolean | null>(null);
  const [exerciseData, setExerciseData] = useState<any>(null);
  const [practiceComplete, setPracticeComplete] = useState(false);
  
  // Total exercises in the practice session
  const totalExercises = 10;
  
  // Generate a new exercise
  const generateExercise = (index: number) => {
    // Different types of exercises based on progress
    const types = [
      "same-denominator", 
      "same-numerator", 
      "benchmark",
      "random", 
      "random",
      "same-denominator", 
      "same-numerator", 
      "benchmark",
      "random",
      "random"
    ];
    
    // Determine difficulty based on progress
    let difficulty: "easy" | "medium" | "hard";
    if (index < 3) difficulty = "easy";
    else if (index < 7) difficulty = "medium";
    else difficulty = "hard";
    
    const type = types[index % types.length];
    const pair = generateFractionPair(
      type as "same-denominator" | "same-numerator" | "benchmark" | "random", 
      difficulty
    );
    
    setExerciseData({
      type,
      difficulty,
      fraction1: pair.fraction1,
      fraction2: pair.fraction2,
    });
  };
  
  // Initialize the first exercise
  useEffect(() => {
    generateExercise(0);
  }, []);
  
  // Handle answer submission
  const handleAnswer = (isCorrect: boolean) => {
    setLastResult(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Move to next exercise after a short delay
    setTimeout(() => {
      if (currentExercise < totalExercises - 1) {
        setCurrentExercise(currentExercise + 1);
        generateExercise(currentExercise + 1);
      } else {
        // Practice session complete
        const finalScore = isCorrect ? score + 1 : score;
        const percentage = Math.round((finalScore / totalExercises) * 100);
        
        // Show completion toast
        toast({
          title: "Practice Complete!",
          description: `You scored ${percentage}% (${finalScore}/${totalExercises} correct)`,
          duration: 5000,
        });
        
        setPracticeComplete(true);
      }
      
      setLastResult(null);
    }, 2000);
  };
  
  // Calculate progress percentage
  const progressPercentage = ((currentExercise) / totalExercises) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {!practiceComplete ? (
            <div className="space-y-6 animate-fade-in">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Exercise {currentExercise + 1} of {totalExercises}</span>
                  <span className="text-sm font-medium">Score: {score}/{currentExercise}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {exerciseData && (
                <FractionComparisonCard
                  fraction1={exerciseData.fraction1}
                  fraction2={exerciseData.fraction2}
                  onResult={handleAnswer}
                />
              )}
            </div>
          ) : (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-math text-brainlift-blue">Practice Complete!</CardTitle>
                <CardDescription>
                  Great job working with fractions today!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-brainlift-blue">{Math.round((score / totalExercises) * 100)}%</span>
                  </div>
                  <p className="text-lg">You got {score} out of {totalExercises} correct</p>
                </div>
                
                <div className="space-y-4">
                  {score < 7 ? (
                    <div className="bg-orange-50 p-4 rounded-md">
                      <h3 className="font-semibold text-brainlift-orange mb-2">Keep Practicing!</h3>
                      <p>It looks like you're still building your fraction comparison skills. Review the concepts and try again!</p>
                    </div>
                  ) : score < 9 ? (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="font-semibold text-brainlift-blue mb-2">Good Progress!</h3>
                      <p>You're getting the hang of fraction comparison. Keep practicing to master the trickier examples!</p>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-md">
                      <h3 className="font-semibold text-brainlift-green mb-2">Excellent Work!</h3>
                      <p>You've demonstrated great understanding of fraction comparison concepts!</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/learn")}>Review Concepts</Button>
                <Button onClick={() => {
                  setCurrentExercise(0);
                  setScore(0);
                  setPracticeComplete(false);
                  generateExercise(0);
                }}>Practice Again</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Practice;
