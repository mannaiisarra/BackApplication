import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormteurFormtionComponent } from './formteur-formtion.component';

describe('FormteurFormtionComponent', () => {
  let component: FormteurFormtionComponent;
  let fixture: ComponentFixture<FormteurFormtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormteurFormtionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormteurFormtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
