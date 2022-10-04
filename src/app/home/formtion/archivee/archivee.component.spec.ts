import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveeComponent } from './archivee.component';

describe('ArchiveeComponent', () => {
  let component: ArchiveeComponent;
  let fixture: ComponentFixture<ArchiveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
