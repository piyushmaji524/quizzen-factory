
import React, { useState, useEffect } from 'react';
import { DailyQuizLevel, Quiz } from '@/types/quiz';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuizGenerator } from '@/hooks/useQuizGenerator';
import LevelsList from '@/components/daily-quiz/LevelsList';
import QuizzesList from '@/components/daily-quiz/QuizzesList';
import QuizDetail from '@/components/daily-quiz/QuizDetail';
import LoadingState from '@/components/daily-quiz/LoadingState';
import { 
  getDifficultyColor, 
  getRandomDuration, 
  getLevelDescription, 
  isQuizzesFresh,
  getStoredQuizzes 
} from '@/utils/quiz-helpers';

const DailyQuiz = () => {
  const [dailyLevels, setDailyLevels] = useState<DailyQuizLevel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLevel, setSelectedLevel] = useState<DailyQuizLevel | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  
  const { generateDailyQuiz, quizzes } = useQuizGenerator();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    loadDailyQuizzes();
  }, []);
  
  // When quizzes are generated, update the daily levels
  useEffect(() => {
    if (quizzes.length > 0) {
      createDailyLevels(quizzes);
    }
  }, [quizzes]);
  
  const loadDailyQuizzes = async () => {
    setIsLoading(true);
    
    try {
      // We'll simulate having existing quizzes or generating new ones
      const storedQuizzes = getStoredQuizzes();
      
      if (storedQuizzes.length > 0 && isQuizzesFresh(storedQuizzes[0].createdAt)) {
        createDailyLevels(storedQuizzes);
      } else {
        // Generate new quizzes
        await generateDailyQuiz();
      }
    } catch (error) {
      console.error('Error loading daily quizzes:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const createDailyLevels = (quizzesList: Quiz[]) => {
    // Group quizzes into levels (3 quizzes per level for this demo)
    const levels: DailyQuizLevel[] = [];
    const quizzesPerLevel = 3; // In a real app, this would be 10
    
    for (let i = 0; i < quizzesList.length; i += quizzesPerLevel) {
      const levelQuizzes = quizzesList.slice(i, i + quizzesPerLevel);
      
      if (levelQuizzes.length > 0) {
        levels.push({
          id: `level-${Math.floor(i / quizzesPerLevel) + 1}`,
          level: Math.floor(i / quizzesPerLevel) + 1,
          title: `Level ${Math.floor(i / quizzesPerLevel) + 1}`,
          description: getLevelDescription(Math.floor(i / quizzesPerLevel) + 1),
          quizzes: levelQuizzes,
          createdAt: new Date().toISOString()
        });
      }
    }
    
    setDailyLevels(levels);
    
    // Store in localStorage
    localStorage.setItem('daily_quizzes', JSON.stringify(quizzesList));
    localStorage.setItem('quizzes_date', new Date().toISOString());
  };
  
  const handleLevelSelect = (level: DailyQuizLevel) => {
    setSelectedLevel(level);
    setSelectedQuiz(null);
    window.scrollTo(0, 0);
  };
  
  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    window.scrollTo(0, 0);
  };
  
  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedQuiz(null);
    window.scrollTo(0, 0);
  };
  
  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 mt-8">
          {isLoading ? (
            <LoadingState />
          ) : selectedQuiz ? (
            <QuizDetail 
              quiz={selectedQuiz} 
              onBack={handleBackToQuizzes} 
              getRandomDuration={getRandomDuration} 
            />
          ) : selectedLevel ? (
            <QuizzesList 
              selectedLevel={selectedLevel} 
              onBackToLevels={handleBackToLevels} 
              onQuizSelect={handleQuizSelect}
              getDifficultyColor={getDifficultyColor}
              getRandomDuration={getRandomDuration}
            />
          ) : (
            <LevelsList 
              dailyLevels={dailyLevels} 
              onLevelSelect={handleLevelSelect} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyQuiz;
