import { WritableSignal } from '@angular/core';

export interface CategoryQuestionVm {
  title: string;
  icon: string;
  questions: WritableSignal<QuestionVm>[];
}

export interface QuestionVm {
  question: string;
  answer: string;
  options: OptionVm[];
  submitted: boolean;
  selected: boolean;
  correct: boolean | undefined;
}

export interface OptionVm {
  option: string;
  selected: boolean;
  isAnswer: boolean;
}
