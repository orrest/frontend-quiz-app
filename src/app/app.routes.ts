import { Routes } from '@angular/router';
import { StartPage } from './pages/start-page/start-page';

export const routes: Routes = [
  {
    path: '',
    component: StartPage,
  },
  {
    path: 'question',
    loadComponent: () =>
      import('./pages/question-page/question-page').then((c) => c.QuestionPage),
  },
  {
    path: 'score',
    loadComponent: () =>
      import('./pages/score-page/score-page').then((c) => c.ScorePage),
  },
];
