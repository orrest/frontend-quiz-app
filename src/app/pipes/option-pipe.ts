import { Pipe, PipeTransform } from '@angular/core';
import { Option } from '../components/question-option/question-option';

@Pipe({
  name: 'option',
  standalone: true,
})
export class OptionPipe implements PipeTransform {
  transform(value: number): Option {
    switch (value) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      default:
        return '';
    }
  }
}
