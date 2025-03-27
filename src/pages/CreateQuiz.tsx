
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Check, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategorySelector from '@/components/CategorySelector';
import { useQuizGenerator } from '@/hooks/useQuizGenerator';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const { 
    quiz, 
    isGenerating, 
    error, 
    generateUserQuiz,
    resetState
  } = useQuizGenerator();
  
  // Reset on component mount
  useEffect(() => {
    resetState();
    setSelectedCategory('');
    setCustomCategory('');
    setActiveQuestion(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    window.scrollTo(0, 0);
  }, []);
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
  };
  
  const handleQuizGeneration = async () => {
    const categoryToUse = selectedCategory || customCategory;
    
    if (!categoryToUse) {
      toast({
        title: "Category Required",
        description: "Please select or enter a category for your quiz",
        variant: "destructive"
      });
      return;
    }
    
    await generateUserQuiz(categoryToUse);
  };
  
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };
  
  const goToNextQuestion = () => {
    if (quiz && activeQuestion < quiz.questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    setShowResults(true);
    window.scrollTo(0, 0);
  };
  
  const calculateScore = () => {
    if (!quiz) return 0;
    
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return correctAnswers;
  };
  
  const resetQuiz = () => {
    setActiveQuestion(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
  };
  
  const startNewQuiz = () => {
    resetState();
    setSelectedCategory('');
    setCustomCategory('');
    resetQuiz();
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Create Your Custom Quiz</h1>
            <p className="text-lg text-muted-foreground">
              Select a category or enter your own topic to generate a personalized quiz with our AI
            </p>
          </motion.div>
          
          {!quiz ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle>Quiz Generator</CardTitle>
                  <CardDescription>
                    Choose a category or enter your own topic to create a custom quiz
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select a Category</Label>
                    <CategorySelector 
                      onCategorySelect={handleCategorySelect}
                      selectedCategory={selectedCategory}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        or enter your own
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Custom Topic</Label>
                    <Input
                      placeholder="E.g., Ancient Egyptian Architecture"
                      value={customCategory}
                      onChange={handleCustomCategoryChange}
                      disabled={!!selectedCategory || isGenerating}
                    />
                  </div>
                  
                  {error && (
                    <div className="text-destructive text-sm mt-2">
                      {error}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={handleQuizGeneration} 
                    disabled={isGenerating || (!selectedCategory && !customCategory)}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-5 w-5" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : showResults ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-border/50 shadow-soft">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Quiz Results</CardTitle>
                  <CardDescription>
                    You scored {calculateScore()} out of {quiz.questions.length}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="mb-8 flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-muted stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        />
                        <circle
                          className="text-primary stroke-current"
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray={Math.PI * 80}
                          strokeDashoffset={
                            Math.PI * 80 * (1 - calculateScore() / quiz.questions.length)
                          }
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">
                          {Math.round((calculateScore() / quiz.questions.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {quiz.questions.map((question, index) => {
                      const isCorrect = userAnswers[question.id] === question.correctAnswer;
                      
                      return (
                        <div 
                          key={question.id} 
                          className={`p-4 rounded-lg ${
                            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              isCorrect ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {isCorrect ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <span className="text-red-600 font-medium">✕</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium mb-2">
                                {index + 1}. {question.question}
                              </p>
                              
                              <div className="space-y-1 mb-3">
                                <p className="text-sm">
                                  <span className="font-medium">Your answer: </span> 
                                  {userAnswers[question.id] || "No answer selected"}
                                </p>
                                
                                {!isCorrect && (
                                  <p className="text-sm text-green-700">
                                    <span className="font-medium">Correct answer: </span> 
                                    {question.correctAnswer}
                                  </p>
                                )}
                              </div>
                              
                              {question.explanation && (
                                <div className="text-sm bg-white/50 p-2 rounded border border-gray-100">
                                  <span className="font-medium">Explanation: </span>
                                  {question.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    onClick={resetQuiz}
                    className="w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry This Quiz
                  </Button>
                  
                  <Button 
                    onClick={startNewQuiz}
                    className="w-full sm:w-auto"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Create New Quiz
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
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
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <p>Question {activeQuestion + 1} of {quiz.questions.length}</p>
                    {quizCompleted ? (
                      <p>Quiz Completed</p>
                    ) : (
                      <p>{userAnswers[quiz.questions[activeQuestion].id] ? 'Answered' : 'Unanswered'}</p>
                    )}
                  </div>
                  
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${((activeQuestion + 1) / quiz.questions.length) * 100}%` }}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-medium mb-4">
                      {quiz.questions[activeQuestion].question}
                    </h3>
                    
                    <RadioGroup
                      value={userAnswers[quiz.questions[activeQuestion].id] || ""}
                      onValueChange={(value) => handleAnswerSelect(quiz.questions[activeQuestion].id, value)}
                    >
                      <div className="space-y-3">
                        {quiz.questions[activeQuestion].options.map((option, index) => (
                          <div key={index} className="flex items-center">
                            <RadioGroupItem
                              value={option}
                              id={`option-${index}`}
                              className="mr-3"
                            />
                            <Label
                              htmlFor={`option-${index}`}
                              className="flex-grow p-3 cursor-pointer hover:bg-muted rounded-md transition-colors"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  {!quizCompleted ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={goToPreviousQuestion}
                        disabled={activeQuestion === 0}
                        className="w-full sm:w-auto"
                      >
                        Previous
                      </Button>
                      
                      <Button
                        onClick={goToNextQuestion}
                        className="w-full sm:w-auto ml-auto"
                      >
                        {activeQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      className="w-full"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Submit and View Results
                    </Button>
                  )}
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

export default CreateQuiz;
