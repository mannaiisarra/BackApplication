import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultofQuizComponent } from './resultof-quiz.component';

describe('ResultofQuizComponent', () => {
  let component: ResultofQuizComponent;
  let fixture: ComponentFixture<ResultofQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultofQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultofQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
