import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScoreCard } from '../components/score-card/score-card';
import { CategoryItem } from '../components/category-item/category-item';
import { DataService } from '../services/data-service';
import { Button } from '../components/button/button';

interface ScoreVm {
  category: string;
  score: number;
  total: number;
  icon: string;
  iconBg: string;
}

@Component({
  selector: 'app-score-page',
  imports: [ScoreCard, CategoryItem, Button, RouterLink],
  templateUrl: './score-page.html',
  styleUrl: './score-page.css',
})
export class ScorePage implements OnDestroy {
  private route = inject(ActivatedRoute);
  private service = inject(DataService);

  vm = signal<ScoreVm>({
    category: '',
    score: 0,
    total: 0,
    icon: '',
    iconBg: '',
  });

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      const categoryParam = params['category'];
      const scoreParam = params['score'];
      const totalParam = params['total'];

      if (categoryParam && scoreParam && totalParam) {
        const category = this.service.getCategoryItem(categoryParam);

        this.service.selectedCategory.next(category);

        this.vm.set({
          category: categoryParam,
          score: scoreParam,
          total: totalParam,
          icon: category.icon,
          iconBg: category.bgClass,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.service.selectedCategory.next(null);
  }
}
