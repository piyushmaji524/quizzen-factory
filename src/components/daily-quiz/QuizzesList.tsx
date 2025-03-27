
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { DailyQuizLevel, Quiz } from '@/types/quiz';
import QuizCard from './QuizCard';

interface QuizzesListProps {
  selectedLevel: DailyQuizLevel;
  onBackToLevels: () => void;
  onQuizSelect: (quiz: Quiz) => void;
  getDifficultyColor: (difficulty: string) => string;
  getRandomDuration: () => string;
}

const QuizzesList: React.FC<QuizzesListProps> = ({ 
  selectedLevel, 
  onBackToLevels, 
  onQuizSelect,
  getDifficultyColor,
  getRandomDuration
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Button 
        variant="ghost" 
        onClick={onBackToLevels} 
        className="mb-4"
      >
        ← Back to Levels
      </Button>
      
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-bold mb-2">
          {selectedLevel.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {selectedLevel.description}
        </p>
      </div>
      
      <div className="space-y-4">
        {selectedLevel.quizzes.map((quiz, index) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            index={index}
            onSelect={onQuizSelect}
            getDifficultyColor={getDifficultyColor}
            getRandomDuration={getRandomDuration}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default QuizzesList;
