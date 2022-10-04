import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  step = 0;
  constructor() { }

  ngOnInit(): void {
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
