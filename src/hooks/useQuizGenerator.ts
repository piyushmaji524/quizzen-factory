import { useState } from 'react';
import { generateQuiz, generateDailyQuizzes } from '@/services/geminiService';
import { Quiz } from '@/types/quiz';
import { toast } from '@/hooks/use-toast';

interface UseQuizGeneratorProps {
  category?: string;
  count?: number;
}

interface UseQuizGeneratorReturn {
  quiz: Quiz | null;
  quizzes: Quiz[];
  isGenerating: boolean;
  error: string | null;
  generateUserQuiz: (category: string) => Promise<void>;
  generateDailyQuiz: () => Promise<void>;
  resetState: () => void;
}

export function useQuizGenerator({ 
  category = '', 
  count = 5 
}: UseQuizGeneratorProps = {}): UseQuizGeneratorReturn {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<number | null>(null);

  // Limit to one quiz generation per 10 minutes
  const canGenerate = (): boolean => {
    if (!lastGeneratedAt) return true;
    
    const tenMinutesInMs = 10 * 60 * 1000;
    const now = Date.now();
    const timeSinceLastGeneration = now - lastGeneratedAt;
    
    return timeSinceLastGeneration >= tenMinutesInMs;
  };

  const generateUserQuiz = async (selectedCategory: string): Promise<void> => {
    if (!selectedCategory) {
      setError('Please select a category');
      toast({
        title: "Error",
        description: "Please select a category first",
        variant: "destructive"
      });
      return;
    }

    if (!canGenerate()) {
      const timeRemaining = Math.ceil((10 * 60 * 1000 - (Date.now() - lastGeneratedAt!)) / 60000);
      setError(`Please wait ${timeRemaining} minutes before generating another quiz`);
      toast({
        title: "Rate limited",
        description: `Please wait ${timeRemaining} minutes before generating another quiz`,
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      toast({
        title: "Generating quiz",
        description: "Please wait while we create your quiz...",
      });
      
      const newQuiz = await generateQuiz(selectedCategory, count);
      setQuiz(newQuiz);
      setLastGeneratedAt(Date.now());
      
      // Save to localStorage
      saveToLocalStorage('last_generated_at', Date.now());
      
      toast({
        title: "Quiz created!",
        description: "Your quiz is ready to play",
      });
    } catch (err) {
      console.error('Error in generateUserQuiz:', err);
      setError('Failed to generate quiz. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDailyQuiz = async (): Promise<void> => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // For demonstration, we're generating a smaller number to keep things fast
      const newQuizzes = await generateDailyQuizzes(3);
      setQuizzes(newQuizzes);
      
      toast({
        title: "Daily quizzes updated!",
        description: "New daily quizzes are now available",
      });
    } catch (err) {
      console.error('Error in generateDailyQuiz:', err);
      setError('Failed to generate daily quizzes. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to generate daily quizzes. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetState = (): void => {
    setQuiz(null);
    setError(null);
  };

  return {
    quiz,
    quizzes,
    isGenerating,
    error,
    generateUserQuiz,
    generateDailyQuiz,
    resetState
  };
}

// Helper functions
function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function getFromLocalStorage(key: string, defaultValue: any = null): any {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}
