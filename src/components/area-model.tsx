
import React from "react";
import { cn } from "@/lib/utils";

interface AreaModelProps {
  numerator: number;
  denominator: number;
  className?: string;
  size?: number;
  highlightColor?: string;
}

export function AreaModel({
  numerator,
  denominator,
  className,
  size = 200,
  highlightColor = "#3b82f6"
}: AreaModelProps) {
  // For simplicity, we'll use a square model
  // For denominators that aren't perfect squares, we'll use a grid layout
  
  const cells = Array.from({ length: denominator }, (_, index) => {
    const isHighlighted = index < numerator;
    
    // Calculate how to lay out the grid
    let cols = 1;
    for (let i = Math.floor(Math.sqrt(denominator)); i >= 1; i--) {
      if (denominator % i === 0) {
        cols = i;
        break;
      }
    }
    
    const rows = denominator / cols;
    
    return (
      <div
        key={index}
        className={cn(
          "transition-colors duration-300 border border-gray-400",
          isHighlighted ? "bg-opacity-90" : "bg-white"
        )}
        style={isHighlighted ? { backgroundColor: highlightColor } : undefined}
      />
    );
  });
  
  return (
    <div 
      className={cn(
        "area-model rounded-md overflow-hidden", 
        className
      )}
      style={{
        width: size,
        height: size,
        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(denominator))}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(denominator / Math.ceil(Math.sqrt(denominator)))}, 1fr)`
      }}
    >
      {cells}
    </div>
  );
}
