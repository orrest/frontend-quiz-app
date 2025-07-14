import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOption } from './question-option';

describe('QuestionOption', () => {
  let component: QuestionOption;
  let fixture: ComponentFixture<QuestionOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
