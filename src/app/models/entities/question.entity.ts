export interface Result {
  quizzes: CategoryQuestion[];
}

export interface CategoryQuestion {
  title: string;
  icon: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}
