
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export function AppHeader() {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHelp = () => {
    toast({
      title: "Need help?",
      description: "BrainLift helps you master fraction comparisons through interactive visualizations and practice.",
      duration: 5000,
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brainlift-blue rounded-md p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 2a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Z" />
              <path d="M12 5v3" />
              <path d="M12 16v3" />
              <path d="M16 8l-2 2" />
              <path d="M10 14l-2 2" />
              <path d="M16 16l-2-2" />
              <path d="M10 10l-2-2" />
            </svg>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-math">BrainLift</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" onClick={handleHelp}>
            Help
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/progress">Progress</Link>
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="block md:hidden mt-2 py-2 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start" onClick={handleHelp}>
            Help
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/progress">Progress</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
