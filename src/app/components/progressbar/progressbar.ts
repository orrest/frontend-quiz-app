import { Component, input } from '@angular/core';

/**
 * 0 ~ 100
 */
@Component({
  selector: 'app-progressbar',
  imports: [],
  templateUrl: './progressbar.html',
  styleUrl: './progressbar.css',
  host: {
    '[class]':
      "'flex bg-white p-1 h-4 items-center rounded-full dark:bg-blue-850 ' + class",
  },
})
export class Progressbar {
  class = input('');

  value = input.required<number, number>({
    transform: (value: number) => {
      if (value < 0) {
        return 0;
      } else if (value > 100) {
        return 100;
      } else {
        return value;
      }
    },
  });
}
