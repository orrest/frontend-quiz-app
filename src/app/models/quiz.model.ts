// 问题选项接口
interface Question {
  question: string;
  options: string[];
  answer: string;
}

// 测验接口
interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

// 根数据接口
interface QuizData {
  quizzes: Quiz[];
}
