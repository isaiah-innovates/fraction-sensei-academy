
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FractionDisplay } from "@/components/fraction-display";
import { AreaModel } from "@/components/area-model";
import { NumberLine } from "@/components/number-line";

const Learn = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("visual-models");
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
          {diagnosticResults && (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-math">Your Diagnostic Results</CardTitle>
                <CardDescription>
                  You scored {diagnosticResults.score}% ({diagnosticResults.correctAnswers}/{diagnosticResults.totalQuestions} correct)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Based on your results, focus on the following concepts:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Understanding how denominators affect fraction size</li>
                  <li>Using the number line to visualize fraction magnitude</li>
                  <li>Comparing fractions to benchmarks like 0, 1/2, and 1</li>
                </ul>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="visual-models" className="animate-fade-in" onValueChange={setActiveSection}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="visual-models">Visual Models</TabsTrigger>
              <TabsTrigger value="number-lines">Number Lines</TabsTrigger>
              <TabsTrigger value="comparison">Comparison Strategies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual-models" className="animate-slide-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-math text-brainlift-blue">Visual Models</CardTitle>
                  <CardDescription>
                    Understanding fractions visually helps build intuition about their relative sizes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Area Models</h3>
                      <p className="mb-4">Area models help us visualize fractions by showing parts of a whole shape.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
                        <div className="flex flex-col items-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={4} 
                            highlightColor="#3b82f6"
                            size={180}
                          />
                          <div className="mt-2 font-math text-lg">
                            <FractionDisplay numerator={1} denominator={4} />
                          </div>
                          <p className="text-sm text-center mt-2">1 of 4 equal parts</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={3} 
                            highlightColor="#14b8a6"
                            size={180}
                          />
                          <div className="mt-2 font-math text-lg">
                            <FractionDisplay numerator={1} denominator={3} />
                          </div>
                          <p className="text-sm text-center mt-2">1 of 3 equal parts</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="font-semibold text-brainlift-blue mb-2">Key Insight:</h4>
                        <p>Notice that <FractionDisplay numerator={1} denominator={3} className="mx-1" /> is larger than <FractionDisplay numerator={1} denominator={4} className="mx-1" /> even though 3 &lt; 4. This is because when we divide a whole into 3 parts, each part is larger than when we divide it into 4 parts.</p>
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold mb-3">The Denominator's Effect</h3>
                      <p className="mb-4">The larger the denominator, the smaller each piece becomes when the numerator is the same.</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="flex flex-col items-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={2} 
                            highlightColor="#3b82f6"
                            size={100}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={1} denominator={2} size="sm" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={4} 
                            highlightColor="#4f46e5"
                            size={100}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={1} denominator={4} size="sm" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={6} 
                            highlightColor="#7e22ce"
                            size={100}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={1} denominator={6} size="sm" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={8} 
                            highlightColor="#a855f7"
                            size={100}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={1} denominator={8} size="sm" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-md">
                        <h4 className="font-semibold text-purple-800 mb-2">Remember:</h4>
                        <p>When comparing fractions with the same numerator, the fraction with the smaller denominator is always larger. This is the opposite of what you might expect from whole numbers!</p>
                      </div>
                    </section>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate("/practice")}>Practice Now</Button>
                  <Button onClick={() => setActiveSection("number-lines")}>Next: Number Lines</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="number-lines" className="animate-slide-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-math text-brainlift-teal">Number Lines</CardTitle>
                  <CardDescription>
                    Number lines help us see fractions as points with specific values between whole numbers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Fractions on the Number Line</h3>
                      <p className="mb-4">Fractions represent specific points on the number line. The denominator tells us how many equal parts are between whole numbers.</p>
                      
                      <div className="mb-6">
                        <NumberLine 
                          min={0} 
                          max={1}
                          disabled={true}
                          showValue={false}
                        />
                        
                        <div className="grid grid-cols-2 gap-8 mt-8">
                          <div>
                            <h4 className="font-semibold mb-2">Halves</h4>
                            <div className="relative h-10 bg-gray-200 rounded-md mb-2 overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute left-0 top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-1/2 top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-full top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-0 bottom-0 transform translate-y-6 text-xs">0</div>
                                <div className="absolute left-1/2 bottom-0 transform translate-y-6 text-xs -translate-x-1/2">1/2</div>
                                <div className="absolute left-full bottom-0 transform translate-y-6 text-xs -translate-x-full">1</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Fourths</h4>
                            <div className="relative h-10 bg-gray-200 rounded-md mb-2 overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute left-0 top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-1/4 top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-2/4 top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-3/4 top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-full top-0 h-full border-r-2 border-gray-400"></div>
                                <div className="absolute left-0 bottom-0 transform translate-y-6 text-xs">0</div>
                                <div className="absolute left-1/4 bottom-0 transform translate-y-6 text-xs -translate-x-1/2">1/4</div>
                                <div className="absolute left-2/4 bottom-0 transform translate-y-6 text-xs -translate-x-1/2">2/4</div>
                                <div className="absolute left-3/4 bottom-0 transform translate-y-6 text-xs -translate-x-1/2">3/4</div>
                                <div className="absolute left-full bottom-0 transform translate-y-6 text-xs -translate-x-full">1</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-teal-50 p-4 rounded-md">
                        <h4 className="font-semibold text-brainlift-teal mb-2">Key Insight:</h4>
                        <p>On a number line, fractions with larger values are further to the right. This makes it easy to see that <FractionDisplay numerator={3} denominator={4} className="mx-1" /> is larger than <FractionDisplay numerator={1} denominator={2} className="mx-1" />.</p>
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Try It: Place a Fraction</h3>
                      <p className="mb-4">Drag the handle to place <FractionDisplay numerator={2} denominator={3} /> on the number line:</p>
                      
                      <NumberLine 
                        min={0} 
                        max={1}
                        step={0.01} 
                        initialValue={0.5}
                        fractionToPlace={{ numerator: 2, denominator: 3 }}
                        correctValue={2/3}
                        showFeedback={true}
                      />
                      
                      <div className="bg-blue-50 p-4 rounded-md mt-6">
                        <h4 className="font-semibold text-brainlift-blue mb-2">Remember:</h4>
                        <p>To convert a fraction to a decimal (for number line placement), divide the numerator by the denominator. For example, <FractionDisplay numerator={2} denominator={3} className="mx-1" /> is approximately 0.67 on the number line.</p>
                      </div>
                    </section>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveSection("visual-models")}>Back: Visual Models</Button>
                  <Button onClick={() => setActiveSection("comparison")}>Next: Comparison Strategies</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="comparison" className="animate-slide-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-math text-brainlift-orange">Comparison Strategies</CardTitle>
                  <CardDescription>
                    Learn effective strategies for comparing fractions with different denominators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Strategy 1: Same Denominators</h3>
                      <p className="mb-4">When fractions have the same denominator, just compare the numerators.</p>
                      
                      <div className="flex justify-center gap-12 items-center mb-6">
                        <div className="text-center">
                          <AreaModel 
                            numerator={2} 
                            denominator={5} 
                            highlightColor="#3b82f6"
                            size={150}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={2} denominator={5} />
                          </div>
                        </div>
                        
                        <div className="text-xl font-bold text-brainlift-orange">&lt;</div>
                        
                        <div className="text-center">
                          <AreaModel 
                            numerator={4} 
                            denominator={5} 
                            highlightColor="#14b8a6"
                            size={150}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={4} denominator={5} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-md">
                        <h4 className="font-semibold text-brainlift-orange mb-2">Rule:</h4>
                        <p>When denominators are the same, the fraction with the larger numerator is larger. <FractionDisplay numerator={4} denominator={5} className="mx-1" /> is larger than <FractionDisplay numerator={2} denominator={5} className="mx-1" /> because 4 &gt; 2.</p>
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Strategy 2: Same Numerators</h3>
                      <p className="mb-4">When fractions have the same numerator, compare the denominators (but be careful!).</p>
                      
                      <div className="flex justify-center gap-12 items-center mb-6">
                        <div className="text-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={2} 
                            highlightColor="#3b82f6"
                            size={150}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={1} denominator={2} />
                          </div>
                        </div>
                        
                        <div className="text-xl font-bold text-brainlift-orange">&gt;</div>
                        
                        <div className="text-center">
                          <AreaModel 
                            numerator={1} 
                            denominator={3} 
                            highlightColor="#14b8a6"
                            size={150}
                          />
                          <div className="mt-2">
                            <FractionDisplay numerator={1} denominator={3} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-md">
                        <h4 className="font-semibold text-brainlift-orange mb-2">Rule:</h4>
                        <p>When numerators are the same, the fraction with the <strong>smaller</strong> denominator is larger. <FractionDisplay numerator={1} denominator={2} className="mx-1" /> is larger than <FractionDisplay numerator={1} denominator={3} className="mx-1" /> because splitting into fewer parts makes each part larger.</p>
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Strategy 3: Benchmark Comparison</h3>
                      <p className="mb-4">Compare fractions to common benchmarks like 0, 1/2, and 1 to estimate their size.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="font-semibold mb-2">Close to 0</h4>
                          <FractionDisplay numerator={1} denominator={10} size="lg" />
                          <p className="mt-2 text-sm">1/10 = 0.1 is close to 0</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="font-semibold mb-2">Close to 1/2</h4>
                          <FractionDisplay numerator={3} denominator={7} size="lg" />
                          <p className="mt-2 text-sm">3/7 ≈ 0.43 is close to 1/2</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="font-semibold mb-2">Close to 1</h4>
                          <FractionDisplay numerator={9} denominator={10} size="lg" />
                          <p className="mt-2 text-sm">9/10 = 0.9 is close to 1</p>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-md">
                        <h4 className="font-semibold text-brainlift-orange mb-2">Tip:</h4>
                        <p>To quickly compare <FractionDisplay numerator={2} denominator={5} className="mx-1" /> and <FractionDisplay numerator={7} denominator={10} className="mx-1" />, notice that 2/5 = 4/10, which is less than 7/10.</p>
                      </div>
                    </section>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveSection("number-lines")}>Back: Number Lines</Button>
                  <Button onClick={() => navigate("/practice")}>Start Practice</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Learn;
