
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AppHeader } from "@/components/app-header";
import { FractionDisplay } from "@/components/fraction-display";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  // Trigger animation after mount
  React.useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <section className={`mb-12 transition-opacity duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-math mb-4 text-brainlift-blue">
                BrainLift: Fraction Mastery
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Master fraction comparisons with engaging visual models and practice
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" className="bg-brainlift-blue hover:bg-blue-600" asChild>
                  <Link to="/diagnostic">Start Diagnostic</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/learn">Learn Concepts</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-brainlift-blue">Visual Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">See fractions come to life with interactive area models that show why 1/4 is less than 1/3.</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-brainlift-blue rounded-md mb-2">
                        <div className="h-full w-1/4 bg-brainlift-blue"></div>
                      </div>
                      <FractionDisplay numerator={1} denominator={4} />
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-brainlift-teal rounded-md mb-2">
                        <div className="h-full w-1/3 bg-brainlift-teal"></div>
                      </div>
                      <FractionDisplay numerator={1} denominator={3} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-brainlift-teal">Number Lines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Place fractions on a number line to visualize their true size and relationships.</p>
                  <div className="relative h-8 w-full bg-gray-200 rounded-md mt-4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute left-0 top-0 h-full border-r-2 border-gray-400"></div>
                      <div className="absolute left-1/4 top-0 h-full border-r-2 border-gray-400"></div>
                      <div className="absolute left-1/2 top-0 h-full border-r-2 border-gray-400"></div>
                      <div className="absolute left-3/4 top-0 h-full border-r-2 border-gray-400"></div>
                      <div className="absolute left-full top-0 h-full border-r-2 border-gray-400"></div>
                      <div className="absolute left-1/4 -top-7 w-8 h-8 -ml-4 rounded-full bg-brainlift-blue flex items-center justify-center text-white text-xs">1/4</div>
                      <div className="absolute left-1/3 -top-7 w-8 h-8 -ml-4 rounded-full bg-brainlift-teal flex items-center justify-center text-white text-xs">1/3</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-brainlift-orange">Compare & Master</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Build confidence in comparing fractions with targeted practice and immediate feedback.</p>
                  <div className="flex justify-center gap-4 mt-4 items-center">
                    <FractionDisplay numerator={2} denominator={5} />
                    <span className="text-2xl text-brainlift-orange font-bold">&lt;</span>
                    <FractionDisplay numerator={3} denominator={4} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-500 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-center">How BrainLift Works</h2>
            
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="bg-brainlift-blue text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold">Diagnostic Assessment</h3>
                  <p className="text-gray-600">Start with a quick diagnostic to identify your specific strengths and areas for improvement with fractions.</p>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="bg-brainlift-teal text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold">Visual Learning</h3>
                  <p className="text-gray-600">See fractions come to life with interactive visual models that demonstrate fraction relationships.</p>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="bg-brainlift-orange text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold">Targeted Practice</h3>
                  <p className="text-gray-600">Build skills with practice problems that target your specific misconceptions and gradually increase in difficulty.</p>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="bg-brainlift-purple text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold">Mastery Assessment</h3>
                  <p className="text-gray-600">Demonstrate your fraction mastery and see your progress from beginning to end.</p>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
