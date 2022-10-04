import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurApprenantComponent } from './formateur-apprenant.component';

describe('FormateurApprenantComponent', () => {
  let component: FormateurApprenantComponent;
  let fixture: ComponentFixture<FormateurApprenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormateurApprenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurApprenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
