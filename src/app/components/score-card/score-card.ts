import { Component, input, TemplateRef, ElementRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-score-card',
  imports: [NgTemplateOutlet],
  templateUrl: './score-card.html',
  styleUrl: './score-card.css',
  host: {
    '[class]':
      "'flex flex-col items-center justify-center p-8 md:p-12 bg-white rounded-xl md:rounded-3xl'",
  },
})
export class ScoreCard {
  headerTemplate = input<TemplateRef<ElementRef>>();
  score = input.required<number>();
  total = input.required<number>();
}
