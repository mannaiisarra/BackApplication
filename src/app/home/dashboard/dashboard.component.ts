import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private datePipe:DatePipe) { }

  ngOnInit(): void {
    if(localStorage.getItem('dateCalendar') == null){
      localStorage.setItem('dateCalendar',this.datePipe.transform(new Date(),"dd-MM-yyyy").toString())
    }
  }

}
