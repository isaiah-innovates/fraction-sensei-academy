
import { cn } from "@/lib/utils";

interface FractionDisplayProps {
  numerator: number;
  denominator: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function FractionDisplay({
  numerator,
  denominator,
  className,
  size = "md",
  color
}: FractionDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl font-bold"
  };
  
  return (
    <div 
      className={cn(
        "fraction font-math", 
        sizeClasses[size], 
        className
      )}
      style={color ? { color } : undefined}
    >
      <span className="numerator">{numerator}</span>
      <span className="divider"></span>
      <span className="denominator">{denominator}</span>
    </div>
  );
}
