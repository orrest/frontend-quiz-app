import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./category-page/category-page').then((c) => c.CategoryPage),
  },
  {
    path: 'questions/:category',
    loadComponent: () =>
      import('./questions-page/questions-page').then((c) => c.QuestionsPage),
  },
  {
    path: 'score',
    loadComponent: () =>
      import('./score-page/score-page').then((c) => c.ScorePage),
  },
];
