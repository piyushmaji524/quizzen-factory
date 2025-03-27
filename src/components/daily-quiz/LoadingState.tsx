
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-lg text-muted-foreground">Loading daily quizzes...</p>
    </div>
  );
};

export default LoadingState;
