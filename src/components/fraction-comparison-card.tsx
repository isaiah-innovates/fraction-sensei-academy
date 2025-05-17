
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FractionDisplay } from "./fraction-display";
import { useToast } from "@/components/ui/use-toast";

interface FractionComparisonCardProps {
  fraction1: { numerator: number; denominator: number };
  fraction2: { numerator: number; denominator: number };
  onResult?: (isCorrect: boolean) => void;
  showExplanation?: boolean;
}

export function FractionComparisonCard({
  fraction1,
  fraction2,
  onResult,
  showExplanation = true,
}: FractionComparisonCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<"less" | "equal" | "greater" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();
  
  const value1 = fraction1.numerator / fraction1.denominator;
  const value2 = fraction2.numerator / fraction2.denominator;
  
  const correctAnswer = 
    value1 < value2 ? "less" :
    value1 > value2 ? "greater" :
    "equal";
  
  const handleSelect = (answer: "less" | "equal" | "greater") => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === correctAnswer;
    onResult?.(isCorrect);
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Well done! Your answer is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is: ${fraction1.numerator}/${fraction1.denominator} is ${correctAnswer} than ${fraction2.numerator}/${fraction2.denominator}.`,
        variant: "destructive",
      });
    }
  };
  
  const getExplanation = () => {
    const decimal1 = value1.toFixed(2);
    const decimal2 = value2.toFixed(2);
    
    if (fraction1.denominator === fraction2.denominator) {
      return `Both fractions have the same denominator (${fraction1.denominator}). Since ${fraction1.numerator} is ${correctAnswer === "less" ? "less than" : correctAnswer === "greater" ? "greater than" : "equal to"} ${fraction2.numerator}, the first fraction is ${correctAnswer}.`;
    } 
    
    return `Converting to decimals: ${fraction1.numerator}/${fraction1.denominator} = ${decimal1} and ${fraction2.numerator}/${fraction2.denominator} = ${decimal2}. Since ${decimal1} is ${correctAnswer === "less" ? "less than" : correctAnswer === "greater" ? "greater than" : "equal to"} ${decimal2}, the first fraction is ${correctAnswer}.`;
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Compare the Fractions</CardTitle>
        <CardDescription className="text-center">Select whether the first fraction is less than, equal to, or greater than the second fraction.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <FractionDisplay 
            numerator={fraction1.numerator} 
            denominator={fraction1.denominator}
            size="lg"
          />
          <div className="text-2xl font-bold">?</div>
          <FractionDisplay 
            numerator={fraction2.numerator} 
            denominator={fraction2.denominator}
            size="lg"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button 
            variant={selectedAnswer === "less" ? (correctAnswer === "less" ? "default" : "destructive") : "outline"}
            onClick={() => handleSelect("less")} 
            disabled={showFeedback}
          >
            Less Than
          </Button>
          <Button 
            variant={selectedAnswer === "equal" ? (correctAnswer === "equal" ? "default" : "destructive") : "outline"} 
            onClick={() => handleSelect("equal")}
            disabled={showFeedback}
          >
            Equal To
          </Button>
          <Button 
            variant={selectedAnswer === "greater" ? (correctAnswer === "greater" ? "default" : "destructive") : "outline"} 
            onClick={() => handleSelect("greater")}
            disabled={showFeedback}
          >
            Greater Than
          </Button>
        </div>
        
        {showFeedback && showExplanation && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm">{getExplanation()}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {showFeedback && (
          <Button 
            onClick={() => {
              setSelectedAnswer(null);
              setShowFeedback(false);
            }}
          >
            Try Another
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
