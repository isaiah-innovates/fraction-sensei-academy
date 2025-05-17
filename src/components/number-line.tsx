
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NumberLineProps {
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  showValue?: boolean;
  fractionToPlace?: { numerator: number; denominator: number };
  disabled?: boolean;
  correctValue?: number;
  showFeedback?: boolean;
}

export function NumberLine({
  min = 0,
  max = 1,
  step = 0.1,
  className,
  initialValue,
  onValueChange,
  showValue = true,
  fractionToPlace,
  disabled = false,
  correctValue,
  showFeedback = false
}: NumberLineProps) {
  const [value, setValue] = useState(initialValue || (max - min) / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);
  
  useEffect(() => {
    if (showFeedback && correctValue !== undefined) {
      // Consider it correct if within 0.05 or 1/20th of the range
      const tolerance = (max - min) / 20; 
      const isCorrect = Math.abs(value - correctValue) <= tolerance;
      setFeedback(isCorrect ? "correct" : "incorrect");
    } else {
      setFeedback(null);
    }
  }, [showFeedback, value, correctValue, min, max]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValueFromPosition(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateValueFromPosition(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      updateValueFromPosition(e.touches[0].clientX);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  const updateValueFromPosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const newValue = min + percentage * (max - min);
      
      // Snap to steps
      const snappedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, snappedValue));
      
      setValue(clampedValue);
      onValueChange?.(clampedValue);
    }
  };

  // Create markers for the number line
  const markers = [];
  for (let i = min; i <= max; i += (max - min) / 4) {
    const percentage = ((i - min) / (max - min)) * 100;
    markers.push(
      <div key={i} className="number-line-marker" style={{ left: `${percentage}%` }}>
        <div className="number-line-label">{i}</div>
      </div>
    );
  }

  const percentage = ((value - min) / (max - min)) * 100;
  
  const getFractionValueString = () => {
    if (fractionToPlace) {
      return `${fractionToPlace.numerator}/${fractionToPlace.denominator}`;
    }
    return value.toFixed(2);
  };
  
  const handleColor = () => {
    if (!showFeedback) return "bg-brainlift-orange";
    
    return feedback === "correct" 
      ? "bg-brainlift-green" 
      : "bg-brainlift-red";
  };
  
  return (
    <div className={cn("relative w-full my-8 px-4", className)}>
      <div className="number-line" ref={containerRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
        {markers}
        {!disabled && (
          <div 
            className={`number-line-handle ${handleColor()}`} 
            style={{ left: `${percentage}%`, cursor: disabled ? "default" : "grab" }}
          >
            {showValue && getFractionValueString()}
          </div>
        )}
        
        {showFeedback && correctValue !== undefined && (
          <div 
            className="absolute -bottom-8 left-0 w-full text-center"
          >
            {feedback === "correct" ? (
              <span className="text-brainlift-green font-bold">Correct!</span>
            ) : (
              <span className="text-brainlift-red font-bold">
                Try again. The correct position is {correctValue.toFixed(2)}.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
