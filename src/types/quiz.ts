
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface DailyQuizLevel {
  id: string;
  level: number;
  title: string;
  description: string;
  quizzes: Quiz[];
  createdAt: string;
}

export type QuizCategory = string;
