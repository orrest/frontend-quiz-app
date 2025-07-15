import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitch } from './components/theme-switch/theme-switch';
import { CategoryItem } from './components/category-item/category-item';
import { DataService } from './services/data-service';
import { Observable } from 'rxjs';
import { CategoryItemVm } from './models/vms/category-item.vm';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitch, CategoryItem, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private service = inject(DataService);

  selectedCategory$!: Observable<CategoryItemVm | undefined>;

  constructor() {
    this.selectedCategory$ = this.service.selectedCategory.asObservable();
  }
}
