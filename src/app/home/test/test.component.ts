import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormationService } from 'src/app/_services/formation.service';
import { DatePipe } from '@angular/common';
import {ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-test',

  templateUrl: './test.component.html',


 styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  reload:boolean=true;
  formations:any=[];
  formationss:any=[];
  formationsBefore:any=[];
  formationsId:any=[];
  affichageCalander:boolean=false;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridDay,dayGridWeek,dayGridMonth'
    }, 
    events: this.formations,
    timeZone: 'local',
  initialDate: localStorage.getItem('dateCalendar')

  };


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(private formationService: FormationService,private datePipe:DatePipe,private cd : ChangeDetectorRef,private router:Router) { }

  ngOnInit(): void {
  this.getAll();
  // this.formations.push({ title: 'event 1', start: '2022-07-01' ,end: '2022-07-05'});

//this.formations.push({ title: 'event 2', date: '2022-07-02' ,duration: '02:00'});

   // console.log("res formation : ",this.calendarOptions.events=[title: 'event 1', date: '1995 ']) 
  }
//  getAll(){
//       this.formationService.getAll().subscribe(res=>{
//        console.log("res formation : ",res.data)
//       this.formations=res.data;
//       console.log("formateur ",this.formations[0].demandes[0].users.email)
//       })
//     }
  //   loadEvents() {
  //     this.formationService.getAll().subscribe((res) => {
  //  this.formations=res.data;
  //  this.events = {{
  //         start: this.formations.debut_date,
  //  }

  changeDate(){
    this.reload=false;
    console.log('here change date');
    this.calendarOptions.initialDate='2022-05-05';
    this.reload= true;
     this.cd.detectChanges();
  }
  getAll(){
    this.formationService.getAll().subscribe(res=>{
    console.log("res formation : ",res.data)
    this.formationsBefore=res.data;

    this.formationsBefore.forEach(element => {
    console.log("date debut ",this.datePipe.transform(element.date_deDebut,"dd-MM-yyyy").toString()," date fin ",this.datePipe.transform(element.date_defin,"yyyy-MM-dd").toString());
    this.formations.push({backgroundColor : '#4682B4',title: element.titre,start: this.datePipe.transform(element.date_deDebut,"yyyy-MM-dd").toString() ,end: this.datePipe.transform(element.date_defin,"yyyy-MM-dd").toString()});

      
    });
    console.log("hereformation for calendar : ",this.formations)
    this.affichageCalander = true;

    })
  }

  getFormationById(formation:any){
    
    console.log("formation selectionne est :",formation.date_deDebut);

    localStorage.setItem('dateCalendar',formation.date_deDebut);

    // this.ngOnInit();

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });

    //window.location.reload();
    


    //   this.formationss.push({backgroundColor : '#4682B4',title: this.formationsId.titre,start: this.datePipe.transform(this.formationsId.debut_date,"yyyy-MM-dd").toString() ,end: this.datePipe.transform(this.formationsId.fin_date,"yyyy-MM-dd").toString()});
    //   console.log("hereformation for calendar : ",this.formationss)
    // this.affichageCalander = true;
      
  
  }
  
  }
       



