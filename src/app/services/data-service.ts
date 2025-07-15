import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryItemVm } from '../models/vms/category-item.vm';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CategoryQuestion, Result } from '../models/entities/question.entity';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  public selectedCategory = new BehaviorSubject<CategoryItemVm | undefined>(
    undefined,
  );

  getCategoryItems(): CategoryItemVm[] {
    return [
      {
        icon: './assets/images/icon-html.svg',
        title: 'HTML',
        bgClass: 'bg-orange-50',
      },
      {
        icon: './assets/images/icon-css.svg',
        title: 'CSS',
        bgClass: 'bg-green-100',
      },
      {
        icon: './assets/images/icon-js.svg',
        title: 'Javascript',
        bgClass: 'bg-blue-50',
      },
      {
        icon: './assets/images/icon-accessibility.svg',
        title: 'Accessibility',
        bgClass: 'bg-purple-100',
      },
    ];
  }

  getCategoryItem(category: string): CategoryItemVm {
    return this.getCategoryItems().filter(
      (c) => c.title.toLowerCase() === category.toLowerCase(),
    )[0];
  }

  getCategoryQuestions(category: string): Observable<CategoryQuestion> {
    return this.http
      .get<Result>('./assets/data.json')
      .pipe(
        map(
          (res) =>
            res.quizzes.filter(
              (cq) => cq.title.toLowerCase() === category.toLowerCase(),
            )[0],
        ),
      );
  }
}
