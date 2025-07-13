import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.html',
  styleUrl: './category-item.css',
  host: {
    '[class]': "'flex flex-row items-center gap-4 md:gap-6 ' + class",
  },
})
export class CategoryItem {
  icon = input.required<string>();
  title = input.required<string>();
  class = input('');
  iconClass = input('');
}
