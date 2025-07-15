import { Component, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';

export interface SwitchChangeEvent {
  originalEvent: Event;
  checked: boolean;
}

@Component({
  selector: 'app-theme-switch',
  imports: [NgClass],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.css',
  host: {
    '[class]': '`flex flex-row gap-2 items-center md:gap-4` + class()',
    '(click)': 'onClick($event)',
  },
})
export class ThemeSwitch {
  class = input('');
  onChange = output<SwitchChangeEvent>();

  checked = signal(false);

  onClick(event: MouseEvent) {
    this.checked.update((old) => !old);

    this.onChange.emit({
      originalEvent: event,
      checked: this.checked(),
    });
  }
}
