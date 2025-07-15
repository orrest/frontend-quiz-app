import { Component, inject } from '@angular/core';
import { DataService } from '../services/data-service';
import { CategoryItem } from '../components/category-item/category-item';
import { CategoryItemVm } from '../models/vms/category-item.vm';

@Component({
  selector: 'app-category-page',
  imports: [CategoryItem],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage {
  private service = inject(DataService);

  categories: CategoryItemVm[] = [];

  constructor() {
    this.categories = this.service.getCategoryItems();
  }
}
