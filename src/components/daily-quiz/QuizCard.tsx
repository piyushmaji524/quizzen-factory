
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Flame, ListChecks } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface QuizCardProps {
  quiz: Quiz;
  index: number;
  onSelect: (quiz: Quiz) => void;
  getDifficultyColor: (difficulty: string) => string;
  getRandomDuration: () => string;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  quiz, 
  index, 
  onSelect, 
  getDifficultyColor, 
  getRandomDuration 
}) => {
  const navigate = useNavigate();
  
  const handleStartQuiz = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // Store the current quiz in localStorage
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
    
    // Show toast notification
    toast({
      title: "Quiz Started!",
      description: "Good luck with your quiz",
    });
    
    // Navigate to the quiz page
    navigate(`/quiz/${quiz.id}`);
  };
  
  return (
    <Card 
      key={quiz.id} 
      className="hover-scale cursor-pointer border-border/50 overflow-hidden bg-white/95 hover:shadow-md transition-shadow"
      onClick={() => onSelect(quiz)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-16 flex-shrink-0 bg-primary/5 flex items-center justify-center p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-border/50">
          <div className="text-2xl font-bold text-primary">{index + 1}</div>
        </div>
        
        <div className="p-4 sm:p-6 flex-grow">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className={getDifficultyColor(quiz.difficulty)}>
              {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            </Badge>
            
            <Badge variant="outline" className="bg-white/50">
              {quiz.category}
            </Badge>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{quiz.description}</p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ListChecks className="w-4 h-4 mr-1.5" />
              {quiz.questions.length} Questions
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {getRandomDuration()}
            </div>
            
            <div className="flex items-center">
              <Flame className="w-4 h-4 mr-1.5" />
              Not Attempted
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-border/50 bg-background/30">
          <Button variant="ghost" className="gap-1" onClick={handleStartQuiz}>
            Start <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
