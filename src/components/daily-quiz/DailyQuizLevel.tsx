
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRight, ListChecks, Trophy } from 'lucide-react';
import { DailyQuizLevel } from '@/types/quiz';
import { motion } from 'framer-motion';

interface DailyQuizLevelCardProps {
  level: DailyQuizLevel;
  onSelect: (level: DailyQuizLevel) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const DailyQuizLevelCard: React.FC<DailyQuizLevelCardProps> = ({ level, onSelect }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card 
        className="h-full hover-scale overflow-hidden cursor-pointer border-border/50 bg-white/95 hover:shadow-md transition-shadow" 
        onClick={() => onSelect(level)}
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
  );
};

export default DailyQuizLevelCard;
