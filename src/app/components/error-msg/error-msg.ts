import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  imports: [],
  templateUrl: './error-msg.html',
  styleUrl: './error-msg.css',
})
export class ErrorMsg {
  err = input.required<string>();
}
