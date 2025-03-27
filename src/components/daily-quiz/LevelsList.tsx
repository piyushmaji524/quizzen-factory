
import React from 'react';
import { motion } from 'framer-motion';
import { DailyQuizLevel } from '@/types/quiz';
import DailyQuizLevelCard from './DailyQuizLevel';
import { Calendar } from 'lucide-react';

interface LevelsListProps {
  dailyLevels: DailyQuizLevel[];
  onLevelSelect: (level: DailyQuizLevel) => void;
}

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

const LevelsList: React.FC<LevelsListProps> = ({ dailyLevels, onLevelSelect }) => {
  return (
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
          <DailyQuizLevelCard 
            key={level.id} 
            level={level} 
            onSelect={onLevelSelect} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LevelsList;
