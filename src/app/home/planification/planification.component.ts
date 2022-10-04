import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormationService } from 'src/app/_services/formation.service';
import { DemandeService } from 'src/app/_services/demande.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DatePipe } from '@angular/common';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {
  reload:boolean=true;
  formations:any=[];
  formationss:any=[];
  formationsBefore:any=[];
  formationsId:any=[];
  demande:any;
  affichageCalander:boolean=false;
  currentUser:any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridDay,dayGridWeek,dayGridMonth'
    }, 
    events: this.formations,
      


  };


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(private demandeService: DemandeService,private token: TokenStorageService,private formationService: FormationService,private datePipe:DatePipe,private cd : ChangeDetectorRef) { }

  ngOnInit(): void {
  this.getAll();
  this.currentUser = this.token.getUser();
  // this.formations.push({ title: 'event 1', start: '2022-07-01' ,end: '2022-07-05'});

//this.formations.push({ title: 'event 2', date: '2022-07-02' ,duration: '02:00'});

   // console.log("res formation : ",this.calendarOptions.events=[title: 'event 1', date: '1995 ']) 
  }
 getAll(){
      this.formationService.getAll().subscribe(res=>{
       console.log("res formation : ",res.data)
      this.formations=res.data;
      console.log("formateur ",this.formations[0].demandes[0].users.email)
      })
    }
  //   loadEvents() {
  //     this.formationService.getAll().subscribe((res) => {
  //  this.formations=res.data;
  //  this.events = {{
  //         start: this.formations.debut_date,
  //  }


  // getAll(){
  //   this.demandeService.getAllDemandeByUsers(this.currentUser.id).subscribe(res=>{

  //     this.demande=res.data;
  //     console.log("getAllDemandeByUsers: ",this.demande)

  //   this.demande.forEach(element => {
  //   console.log("date debut ",this.datePipe.transform(element.date_deDebut,"dd-MM-yyyy").toString()," date fin ",this.datePipe.transform(element.date_defin,"yyyy-MM-dd").toString());
  //   this.formations.push({backgroundColor : '#4682B4',title: element.titre,start: this.datePipe.transform(element.date_deDebut,"yyyy-MM-dd").toString() ,end: this.datePipe.transform(element.date_defin,"yyyy-MM-dd").toString()});

      
  //   });
  //   console.log("hereformation for calendar : ",this.formations)
    

  //   })
  // }


  
  }
       



