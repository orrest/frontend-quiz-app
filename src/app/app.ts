import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  SwitchChangeEvent,
  ThemeSwitch,
} from './components/theme-switch/theme-switch';
import { CategoryItem } from './components/category-item/category-item';
import { DataService } from './services/data-service';
import { Observable } from 'rxjs';
import { CategoryItemVm } from './models/vms/category-item.vm';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitch, CategoryItem, AsyncPipe, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private service = inject(DataService);

  selectedCategory$!: Observable<CategoryItemVm | null>;

  dark = signal<boolean>(false);

  constructor() {
    this.selectedCategory$ = this.service.selectedCategory.asObservable();
  }

  onChange(event: SwitchChangeEvent) {
    this.dark.set(event.checked);
  }
}
