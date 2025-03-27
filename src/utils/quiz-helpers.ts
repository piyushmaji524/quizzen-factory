
import { Quiz } from '@/types/quiz';

export const getDifficultyColor = (difficulty: string): string => {
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

export const getRandomDuration = (): string => {
  const minutes = Math.floor(Math.random() * 10) + 5;
  return `${minutes} min`;
};

export const getRandomQuestionCount = (): number => {
  return Math.floor(Math.random() * 3) + 8; // 8-10 questions
};

export const getLevelDescription = (level: number): string => {
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

export const isQuizzesFresh = (createdAtString: string): boolean => {
  try {
    const createdAt = new Date(createdAtString);
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

export const getStoredQuizzes = (): Quiz[] => {
  try {
    const storedQuizzes = localStorage.getItem('daily_quizzes');
    return storedQuizzes ? JSON.parse(storedQuizzes) : [];
  } catch (error) {
    console.error('Error retrieving stored quizzes:', error);
    return [];
  }
};
