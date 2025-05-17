
/**
 * Generates a random fraction with the specified constraints
 */
export function generateRandomFraction(
  maxDenominator: number = 10,
  allowImproper: boolean = false,
  specificDenominator?: number
): { numerator: number; denominator: number } {
  // Use the specific denominator if provided, otherwise generate randomly
  const denominator = specificDenominator || Math.floor(Math.random() * (maxDenominator - 2)) + 2;
  
  // For proper fractions, numerator must be less than denominator
  const maxNumerator = allowImproper ? denominator * 2 : denominator - 1;
  const numerator = Math.floor(Math.random() * maxNumerator) + 1;
  
  return { numerator, denominator };
}

/**
 * Generates two different fractions for comparison exercises
 */
export function generateFractionPair(
  type: "same-denominator" | "same-numerator" | "benchmark" | "random" = "random",
  difficulty: "easy" | "medium" | "hard" = "medium"
): { 
  fraction1: { numerator: number; denominator: number }; 
  fraction2: { numerator: number; denominator: number };
} {
  let fraction1: { numerator: number; denominator: number };
  let fraction2: { numerator: number; denominator: number };
  
  const maxDenominator = difficulty === "easy" ? 6 : difficulty === "medium" ? 10 : 20;
  
  switch (type) {
    case "same-denominator":
      const denominator = Math.floor(Math.random() * (maxDenominator - 2)) + 2;
      fraction1 = generateRandomFraction(maxDenominator, false, denominator);
      // Make sure we get a different numerator for fraction2
      do {
        fraction2 = generateRandomFraction(maxDenominator, false, denominator);
      } while (fraction1.numerator === fraction2.numerator);
      break;
      
    case "same-numerator":
      // Generate a random numerator between 1 and 5
      const numerator = Math.floor(Math.random() * 5) + 1;
      // For the first fraction
      const den1 = Math.floor(Math.random() * (maxDenominator - 2)) + 2;
      // For the second fraction, make sure it's different
      let den2;
      do {
        den2 = Math.floor(Math.random() * (maxDenominator - 2)) + 2;
      } while (den1 === den2);
      
      fraction1 = { numerator, denominator: den1 };
      fraction2 = { numerator, denominator: den2 };
      break;
    
    case "benchmark":
      // Create one fraction close to 0, 1/2, or 1
      const benchmarks = [0.1, 0.5, 0.9];
      const target = benchmarks[Math.floor(Math.random() * benchmarks.length)];
      
      // Create a fraction close to the benchmark
      const closeDenominator = Math.floor(Math.random() * (maxDenominator - 5)) + 5;
      const closeNumerator = Math.round(target * closeDenominator);
      
      // Create another fraction clearly different
      const farDenominator = Math.floor(Math.random() * (maxDenominator - 5)) + 5;
      // Make it either clearly larger or smaller than the benchmark
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offset = direction * (Math.floor(Math.random() * (farDenominator - 2)) + 2) / farDenominator;
      const farTarget = Math.max(0.1, Math.min(0.95, target + offset));
      const farNumerator = Math.round(farTarget * farDenominator);
      
      fraction1 = { numerator: closeNumerator, denominator: closeDenominator };
      fraction2 = { numerator: farNumerator, denominator: farDenominator };
      break;
      
    case "random":
    default:
      fraction1 = generateRandomFraction(maxDenominator);
      
      // Generate a second fraction and make sure they're not equivalent
      do {
        fraction2 = generateRandomFraction(maxDenominator);
      } while ((fraction1.numerator * fraction2.denominator) === (fraction2.numerator * fraction1.denominator));
      break;
  }
  
  return { fraction1, fraction2 };
}

/**
 * Finds the greatest common divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Reduces a fraction to its simplest form
 */
export function reduceFraction(numerator: number, denominator: number): { numerator: number; denominator: number } {
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
}

/**
 * Converts fractions to the same denominator
 */
export function convertToSameDenominator(
  fraction1: { numerator: number; denominator: number },
  fraction2: { numerator: number; denominator: number }
): { 
  fraction1: { numerator: number; denominator: number }; 
  fraction2: { numerator: number; denominator: number };
  commonDenominator: number;
} {
  // Find the least common multiple (LCM) of the denominators
  const lcm = (fraction1.denominator * fraction2.denominator) / gcd(fraction1.denominator, fraction2.denominator);
  
  // Convert fractions to use the LCM as denominator
  const newNumerator1 = fraction1.numerator * (lcm / fraction1.denominator);
  const newNumerator2 = fraction2.numerator * (lcm / fraction2.denominator);
  
  return {
    fraction1: { numerator: newNumerator1, denominator: lcm },
    fraction2: { numerator: newNumerator2, denominator: lcm },
    commonDenominator: lcm
  };
}
