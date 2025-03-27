
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, BarChart3, Brain, Clock, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import { Quiz } from '@/types/quiz';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface QuizDetailProps {
  quiz: Quiz;
  onBack: () => void;
  getRandomDuration: () => string;
}

const QuizDetail: React.FC<QuizDetailProps> = ({ quiz, onBack, getRandomDuration }) => {
  const navigate = useNavigate();
  
  const handleStartQuiz = () => {
    // Store the current quiz in localStorage to access it on the quiz page
    localStorage.setItem('currentQuiz', JSON.stringify(quiz));
    
    // Show toast notification
    toast({
      title: "Quiz Started!",
      description: "Good luck with your quiz",
    });
    
    // Navigate to the quiz page
    // In a real application, you would navigate to a dedicated quiz page
    // For now, we'll just show a toast notification
    console.log("Starting quiz:", quiz.title);
    
    // This would be uncommented in a real application:
    // navigate(`/quiz/${quiz.id}`);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-4"
      >
        ← Back to Quizzes
      </Button>
      
      <Card className="border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {quiz.category}
            </Badge>
            <Badge variant={
              quiz.difficulty === 'easy' ? 'secondary' : 
              quiz.difficulty === 'medium' ? 'outline' : 'default'
            }>
              {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            </Badge>
          </div>
          
          <CardTitle className="text-2xl mt-3">{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              <ListChecks className="w-4 h-4 mr-1.5" />
              {quiz.questions.length} Questions
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {getRandomDuration()}
            </div>
            
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Medium Difficulty
            </div>
            
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1.5" />
              50 Points
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Quiz Preview</h3>
            
            <div className="space-y-3">
              {quiz.questions.slice(0, 3).map((question, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-medium mb-2">{index + 1}. {question.question}</p>
                  <div className="text-muted-foreground text-sm">
                    {question.options.length} multiple choice options
                  </div>
                </div>
              ))}
              
              {quiz.questions.length > 3 && (
                <div className="text-center text-muted-foreground py-2">
                  + {quiz.questions.length - 3} more questions
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleStartQuiz}>
            <Brain className="w-4 h-4 mr-2" />
            Start Quiz
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            This quiz was generated with AI and is available for today only
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizDetail;
