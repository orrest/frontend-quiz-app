import { Component, HostBinding, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

export type Option = 'A' | 'B' | 'C' | 'D' | '';

export enum Status {
  Normal = 0,
  Correct = 1,
  Wrong = 2,
  Answer = 3,
  Selected = 4,
}

@Component({
  selector: 'app-question-option',
  imports: [NgClass],
  templateUrl: './question-option.html',
  styleUrl: './question-option.css',
})
export class QuestionOption {
  option = input.required<Option>();
  description = input.required<string>();
  status = input<Status>(Status.Normal);

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses =
      'flex flex-row gap-4 p-4 bg-white rounded-xl items-center ' +
      'hover:outline-2 hover:outline-purple-600 hover:cursor-pointer ' +
      'group ' +
      'dark:bg-blue-850';

    let statusClasses = '';
    switch (this.status()) {
      case Status.Wrong:
        statusClasses = 'outline-2 outline-red-500';
        break;
      case Status.Correct:
        statusClasses = 'outline-2 outline-green-500';
        break;
      case Status.Selected:
        statusClasses = 'outline-2 outline-purple-600';
        break;
    }

    return `${baseClasses} ${statusClasses}`;
  }

  public Status = Status;
}
