import {
  Component,
  computed,
  inject,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Progressbar } from '../components/progressbar/progressbar';
import {
  QuestionOption,
  Status,
} from '../components/question-option/question-option';
import { Button } from '../components/button/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OptionPipe } from '../pipes/option-pipe';
import { OptionVm, QuestionVm } from '../models/vms/question.vm';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ErrorMsg } from '../components/error-msg/error-msg';

@Component({
  selector: 'app-questions-page',
  imports: [
    Progressbar,
    QuestionOption,
    Button,
    OptionPipe,
    AsyncPipe,
    ErrorMsg,
  ],
  templateUrl: './questions-page.html',
  styleUrl: './questions-page.css',
})
export class QuestionsPage implements OnDestroy {
  protected readonly Status = Status;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(DataService);

  error = new Subject<string | null>();
  error$ = this.error.asObservable();

  category = signal('');
  title = signal('');
  icon = signal('');

  /* Save the state of every question.*/
  questions = signal<WritableSignal<QuestionVm>[] | undefined>(undefined);
  currentQuestion: Signal<WritableSignal<QuestionVm>> = computed(() => {
    const qs = this.questions();

    const empty = signal({
      question: '',
      options: [],
      answer: '',
      submitted: false,
      selected: false,
      correct: undefined,
    });

    if (!qs) return empty;

    if (qs.length === 0) return empty;

    const index = this.currentIndex();
    return index >= 0 && index < qs.length ? qs[index] : empty;
  });

  currentIndex = signal<number>(0);
  currentNumber = computed(() => this.currentIndex() + 1);
  currentProgress = computed(() => this.currentNumber() * 10);
  lastSubmittedQuestion = computed(
    () =>
      this.currentNumber() === this.questions()?.length &&
      this.currentQuestion()().submitted,
  );

  selectedOption = signal<OptionVm>({
    option: '',
    selected: false,
    isAnswer: false,
  });

  correctQuestions = 0;

  constructor() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const category = params['category'];
        this.category.set(category);
      });

    this.service
      .getCategoryQuestions(this.category())
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (cq) => {
          this.title.set(cq.title);
          this.icon.set(cq.icon);
          const questionSignals = cq.questions.map((q) =>
            signal<QuestionVm>({
              question: q.question,
              answer: q.answer,
              options: q.options.map((o) => {
                return {
                  option: o,
                  selected: false,
                  isAnswer: q.answer === o,
                };
              }),
              submitted: false,
              selected: false,
              correct: undefined,
            }),
          );

          this.questions.set(questionSignals);

          if (this.questions.length > 0) {
            this.currentIndex.set(0);
          }

          console.log(this.questions()?.length);
        },
        error: (err) => {
          console.log(err);
        },
      });

    const categoryVm = this.service.getCategoryItem(this.category());
    this.service.selectedCategory.next(categoryVm);
  }

  ngOnDestroy(): void {
    this.service.selectedCategory.next(null);
  }

  submit(question: WritableSignal<QuestionVm>) {
    if (question().selected) {
      question.update((old) => {
        return { ...old, submitted: true };
      });

      if (question().selected && question().submitted && question().correct) {
        this.correctQuestions++;
      }
    } else {
      this.error.next('Please select an answer');
    }
  }

  onOptionClick(question: WritableSignal<QuestionVm>, optionIndex: number) {
    this.error.next(null);

    if (question().submitted) {
      return;
    }

    question.update((q) => {
      // set all selected to false
      const updatedOptions = q.options.map((o) => {
        return {
          ...o,
          selected: false,
        };
      });

      // set the index option to selected
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        selected: true,
      };

      this.selectedOption.set(updatedOptions[optionIndex]);

      // update the question source
      return {
        ...q,
        submitted: false,
        selected: true,
        correct:
          this.selectedOption().selected && this.selectedOption().isAnswer,
        options: updatedOptions,
      };
    });
  }

  nextQuestion() {
    const next = this.currentIndex() + 1;
    if (next < 0 || next > this.questions()!.length - 1) {
      return;
    }

    this.currentIndex.update((old) => old + 1);
  }

  toScorePage() {
    this.router.navigate(['/score'], {
      queryParams: {
        category: this.category(),
        score: this.correctQuestions,
        total: this.currentNumber(),
      },
    });
  }
}
