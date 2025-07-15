import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitch } from './components/theme-switch/theme-switch';
import { CategoryItem } from './components/category-item/category-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitch, CategoryItem],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'password-generator-app';
}
