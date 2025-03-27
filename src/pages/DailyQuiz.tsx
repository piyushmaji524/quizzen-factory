
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Brain, Calendar, ChevronRight, Clock, Flame, 
  ListChecks, Loader2, BarChart3, Award, Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuizGenerator } from '@/hooks/useQuizGenerator';
import { DailyQuizLevel, Quiz } from '@/types/quiz';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

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
  
  // Helper functions
  const getStoredQuizzes = (): Quiz[] => {
    try {
      const storedQuizzes = localStorage.getItem('daily_quizzes');
      return storedQuizzes ? JSON.parse(storedQuizzes) : [];
    } catch (error) {
      console.error('Error retrieving stored quizzes:', error);
      return [];
    }
  };
  
  const isQuizzesFresh = (createdAtString: string): boolean => {
    try {
      const quizzesDate = localStorage.getItem('quizzes_date');
      if (!quizzesDate) return false;
      
      const createdAt = new Date(quizzesDate);
      const now = new Date();
      
      // Check if the quizzes were created today
      return (
        createdAt.getDate() === now.getDate() &&
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear()
      );
    } catch (error) {
      console.error('Error checking if quizzes are fresh:', error);
      return false;
    }
  };
  
  const getLevelDescription = (level: number): string => {
    const descriptions = [
      "Start your journey with these beginner-friendly quizzes",
      "Step up your knowledge with slightly more challenging questions",
      "Test your expanding expertise with these intermediate quizzes",
      "Challenge yourself with these advanced knowledge tests",
      "Only the most knowledgeable can conquer these expert quizzes",
      "Master-level questions for the truly dedicated",
      "Elite knowledge challenges for quiz enthusiasts",
      "Legendary difficulty for the quiz champions",
      "Supreme challenge for knowledge seekers",
      "Ultimate quizzes for the most dedicated minds"
    ];
    
    return descriptions[Math.min(level - 1, descriptions.length - 1)];
  };
  
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getRandomDuration = (): string => {
    const minutes = Math.floor(Math.random() * 10) + 5;
    return `${minutes} min`;
  };
  
  const getRandomQuestionCount = (): number => {
    return Math.floor(Math.random() * 3) + 8; // 8-10 questions
  };
  
  // Render functions
  const renderLevelsList = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Daily Quiz Challenges
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore our daily quiz levels and challenge yourself with new questions every day
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyLevels.map((level) => (
          <motion.div key={level.id} variants={itemVariants}>
            <Card 
              className="h-full hover-scale overflow-hidden cursor-pointer border-border/50 bg-white/95 hover:shadow-md transition-shadow" 
              onClick={() => handleLevelSelect(level)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Level {level.level}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    Today
                  </div>
                </div>
                <CardTitle>{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-muted-foreground text-sm mb-2">
                    <span>Progress</span>
                    <span>0/{level.quizzes.length} Completed</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ListChecks className="w-4 h-4 mr-1" />
                    {level.quizzes.length} Quizzes
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4 mr-1" />
                    {level.level * 100} Points
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full mt-2" variant="ghost">
                  Start Level <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
  
  const renderQuizzesList = () => {
    if (!selectedLevel) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <Button 
          variant="ghost" 
          onClick={handleBackToLevels} 
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
            <Card 
              key={quiz.id} 
              className="hover-scale cursor-pointer border-border/50 overflow-hidden bg-white/95 hover:shadow-md transition-shadow"
              onClick={() => handleQuizSelect(quiz)}
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
                  <Button variant="ghost" className="gap-1">
                    Start <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  };
  
  const renderQuiz = () => {
    if (!selectedQuiz) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <Button 
          variant="ghost" 
          onClick={handleBackToQuizzes} 
          className="mb-4"
        >
          ← Back to Quizzes
        </Button>
        
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {selectedQuiz.category}
              </Badge>
              <Badge variant={
                selectedQuiz.difficulty === 'easy' ? 'secondary' : 
                selectedQuiz.difficulty === 'medium' ? 'outline' : 'default'
              }>
                {selectedQuiz.difficulty.charAt(0).toUpperCase() + selectedQuiz.difficulty.slice(1)}
              </Badge>
            </div>
            
            <CardTitle className="text-2xl mt-3">{selectedQuiz.title}</CardTitle>
            <CardDescription>{selectedQuiz.description}</CardDescription>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
              <div className="flex items-center">
                <ListChecks className="w-4 h-4 mr-1.5" />
                {selectedQuiz.questions.length} Questions
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
                {selectedQuiz.questions.slice(0, 3).map((question, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-2">{index + 1}. {question.question}</p>
                    <div className="text-muted-foreground text-sm">
                      {question.options.length} multiple choice options
                    </div>
                  </div>
                ))}
                
                {selectedQuiz.questions.length > 3 && (
                  <div className="text-center text-muted-foreground py-2">
                    + {selectedQuiz.questions.length - 3} more questions
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-lg text-muted-foreground">Loading daily quizzes...</p>
            </div>
          ) : selectedQuiz ? (
            renderQuiz()
          ) : selectedLevel ? (
            renderQuizzesList()
          ) : (
            renderLevelsList()
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyQuiz;
