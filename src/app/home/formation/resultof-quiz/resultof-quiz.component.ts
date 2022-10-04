import { QuizResultService } from './../../../_services/quiz-result.service';
import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_services/demande.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { QuizService } from 'src/app/_services/quiz.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-resultof-quiz',
  templateUrl: './resultof-quiz.component.html',
  styleUrls: ['./resultof-quiz.component.css']
})
export class ResultofQuizComponent implements OnInit {
  result:any;
  resultct:any;
  isSubmitt=false;
  currentUser:any;
  demande:any;
  quiz:any;
resultd:any;
resal:any;
isSubmit=false;
base_picture=environment.base_picture;
  constructor(private quizService: QuizService,private demandeService:DemandeService,private token: TokenStorageService ,private quizResultService:QuizResultService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.currentUser = this.token.getUser();
    this.getAllFormationByFormateur();
  }
  getAllUsers(){
    this.quizResultService.getResult().subscribe(res=>{
     console.log("get all result : ",res.data)
    this.result=res.data;
    this.result.forEach(element =>{
if(element.marksObtained == 20)    {
  console.log("succées : ",this.resultct)
  this.isSubmit=true;
this.resultct="succées";
}
  if(element.marksObtained >10){
    this.resultct="succées";
    this.isSubmit=true;
  }
if(element.marksObtained < 10){
  this.resultct="failed";
  this.isSubmit=false;
}
    })
  })
  }


  getAllFormationByFormateur(){
    this.demandeService.getAllDemandeByUsers(this.currentUser.id).subscribe(
      ress => {
      
        
  this.demande=ress.data;
  console.log("ya rab",this.demande
  );
 
     

      })
  }


  getQUIZvyFormation(id:any){
    this.quizService.getquizByFormation(id).subscribe(
      ress => {
      
        this.isSubmitt=true; 
this.quiz=ress.data;
  console.log("ya rab",this.quiz);
 
//   this.quizResultService.getresultByquiz(this.quiz.id).subscribe(
//     resse => {
//     this.resal=resse.data;
    

// console.log("ya rab",resse.data);

   

//     })

      })
     
  }
}
