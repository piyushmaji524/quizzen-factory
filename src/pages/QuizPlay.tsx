
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Quiz, QuizQuestion } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Brain, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const QuizPlay = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  
  useEffect(() => {
    // Load the quiz from localStorage
    const storedQuiz = localStorage.getItem('currentQuiz');
    
    if (storedQuiz) {
      try {
        const parsedQuiz = JSON.parse(storedQuiz);
        setQuiz(parsedQuiz);
      } catch (error) {
        console.error('Error parsing quiz:', error);
        toast({
          title: 'Error',
          description: 'Failed to load quiz data',
          variant: 'destructive',
        });
        navigate('/daily-quiz');
      }
    } else {
      toast({
        title: 'Error',
        description: 'No quiz found',
        variant: 'destructive',
      });
      navigate('/daily-quiz');
    }
  }, [navigate]);
  
  useEffect(() => {
    // Timer countdown
    if (quiz && !isQuizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (!isQuizCompleted) {
              setIsQuizCompleted(true);
              toast({
                title: 'Time\'s up!',
                description: `You scored ${score} out of ${quiz.questions.length}`,
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quiz, isQuizCompleted, timeLeft, score]);
  
  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      toast({
        title: 'Correct!',
        description: currentQuestion.explanation || 'Great job!',
      });
    } else {
      toast({
        title: 'Incorrect',
        description: currentQuestion?.explanation || 'The correct answer was: ' + currentQuestion?.correctAnswer,
        variant: 'destructive',
      });
    }
  };
  
  const handleNextQuestion = () => {
    if (!quiz) return;
    
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
      toast({
        title: 'Quiz Completed!',
        description: `You scored ${score} out of ${quiz.questions.length}`,
      });
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const calculatePercentage = (): number => {
    if (!quiz) return 0;
    return Math.round((score / quiz.questions.length) * 100);
  };
  
  const handleReturnToDashboard = () => {
    navigate('/daily-quiz');
  };
  
  const currentQuestion = quiz?.questions[currentQuestionIndex];
  
  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading quiz...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 mt-8 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={handleReturnToDashboard} 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quizzes
          </Button>
          
          {!isQuizCompleted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow-soft border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>{quiz.category}</Badge>
                      <Badge variant="outline">{quiz.difficulty}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className={timeLeft < 60 ? 'text-red-500 font-bold' : ''}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                  
                  <CardTitle className="mt-4">
                    {quiz.title}
                  </CardTitle>
                  
                  <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                    <div>Question {currentQuestionIndex + 1} of {quiz.questions.length}</div>
                    <div>Score: {score}/{quiz.questions.length}</div>
                  </div>
                </CardHeader>
                
                <Separator />
                
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="text-xl font-medium">
                      {currentQuestion?.question}
                    </div>
                    
                    <div className="space-y-3">
                      {currentQuestion?.options.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            selectedAnswer === option 
                              ? (option === currentQuestion.correctAnswer 
                                ? 'bg-green-100 border-green-500 border' 
                                : 'bg-red-100 border-red-500 border')
                              : 'bg-muted/30 hover:bg-muted/50'
                          } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={isAnswered}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {isAnswered && option === selectedAnswer && (
                              option === currentQuestion.correctAnswer ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )
                            )}
                            {isAnswered && option === currentQuestion.correctAnswer && selectedAnswer !== option && (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={handleNextQuestion}
                    className="w-full mt-4"
                    disabled={!isAnswered}
                  >
                    {currentQuestionIndex + 1 < quiz.questions.length ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow-soft border-border/50">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    Quiz Results
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="text-center space-y-6">
                    <Brain className="w-16 h-16 mx-auto text-primary" />
                    
                    <div className="text-3xl font-bold">
                      {score} / {quiz.questions.length}
                    </div>
                    
                    <div className="text-lg">
                      You scored {calculatePercentage()}%
                    </div>
                    
                    <div className="text-muted-foreground">
                      {calculatePercentage() >= 70 
                        ? 'Great job! You have a good understanding of this topic.' 
                        : 'Keep practicing to improve your knowledge on this topic.'}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={handleReturnToDashboard}
                    className="w-full"
                  >
                    Return to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizPlay;
