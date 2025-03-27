
import { QuizQuestion, Quiz } from '@/types/quiz';

const GEMINI_API_KEY = 'AIzaSyD1SFLhp2Us8anc0ohgS9LcakID-h-4N9c';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateQuiz(category: string, count: number = 5): Promise<Quiz> {
  try {
    const prompt = `
      Create a quiz about ${category} with exactly ${count} multiple choice questions.
      Format as a JSON object with the following structure:
      {
        "title": "A catchy title for the quiz",
        "description": "A brief description of the quiz",
        "questions": [
          {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "The correct option exactly as written in the options array",
            "explanation": "A brief explanation of why this answer is correct"
          }
        ]
      }
      
      Make sure:
      - The title is engaging and specific to the ${category} category
      - Each question has exactly 4 options
      - The correct answer is exactly the same as one of the options
      - The questions are diverse and interesting
      - All information is factually accurate
      - Return ONLY the JSON with no additional text
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the text response from Gemini
    const textResponse = data.contents?.[0]?.parts?.[0]?.text;
    
    if (!textResponse) {
      throw new Error('No text in response from Gemini API');
    }

    // Extract JSON from the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from the response');
    }

    const quizData = JSON.parse(jsonMatch[0]);

    // Format the response to match our Quiz type
    const formattedQuiz: Quiz = {
      id: generateId(),
      title: quizData.title,
      category,
      description: quizData.description,
      questions: quizData.questions.map((q: any, index: number) => ({
        id: `q-${index}-${generateId()}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      })),
      createdAt: new Date().toISOString(),
      difficulty: determineDifficulty()
    };

    return formattedQuiz;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}

export async function generateDailyQuizzes(count: number = 10): Promise<Quiz[]> {
  // For the sake of this example, we'll generate quizzes on random categories
  const quizzes: Quiz[] = [];
  const randomCategories = getRandomCategories(count);
  
  try {
    // We'll generate one quiz at a time to avoid rate limits
    for (const category of randomCategories) {
      const quiz = await generateQuiz(category, 10);
      quizzes.push(quiz);
      
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return quizzes;
  } catch (error) {
    console.error('Error generating daily quizzes:', error);
    throw error;
  }
}

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function determineDifficulty(): 'easy' | 'medium' | 'hard' {
  const rand = Math.random();
  if (rand < 0.33) return 'easy';
  if (rand < 0.66) return 'medium';
  return 'hard';
}

function getRandomCategories(count: number): string[] {
  const categories = [
    'Science & Technology', 'History', 'Geography', 'Arts & Literature', 
    'Sports', 'Music', 'Movies & TV Shows', 'Food & Cooking', 
    'General Knowledge', 'Pop Culture'
  ];
  
  const shuffled = [...categories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
