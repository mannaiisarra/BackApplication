import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_services/demande.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { environment } from 'src/environments/environment.prod';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatePipe } from '@angular/common';
import {ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  reload:boolean=true;
  currentUser:any;
  demande:any;
  base_picture=environment.base_picture;
  formations:any=[];
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
  constructor(private demandeService:DemandeService , private token: TokenStorageService,private datePipe:DatePipe,private cd : ChangeDetectorRef,private router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getAllFormationByFormateur();
  }

  changeDate(){
    this.reload=false;
    console.log('here change date');
    this.calendarOptions.initialDate='2022-05-05';
    this.reload= true;
     this.cd.detectChanges();
  }
getAllFormationByFormateur(){
  this.demandeService.getAllDemandeByUsers(this.currentUser.id).subscribe(
    ress => {
      console.log(ress.data);
      
this.demande=ress.data;

this.demande= this.demande.filter(item =>
  {
    return item.formationn.archiver == false ;

    
  }

  );
   
  this.demande.forEach(element => {
    // console.log("date debut ",this.datePipe.transform(element.date_deDebut,"dd-MM-yyyy").toString()," date fin ",this.datePipe.transform(element.date_defin,"yyyy-MM-dd").toString());
   this.formations.push({backgroundColor : '#4682B4',title: element.formationn.titre,start: this.datePipe.transform(element.formationn.date_deDebut,"yyyy-MM-dd").toString() ,end: this.datePipe.transform(element.formationn.date_defin,"yyyy-MM-dd").toString()});
 console.log("element ",element);

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
