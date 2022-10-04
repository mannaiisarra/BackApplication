import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResultService } from './../../../_services/quiz-result.service';
import { environment } from 'src/environments/environment.prod';
import { QuizService } from 'src/app/_services/quiz.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  id:string=this.activatedRouter.snapshot.params["id"];
  resal:any;
  base_picture=environment.base_picture;
  constructor(private quizService: QuizResultService,private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("id from activate router ",this.id) 
    this.getQUIZvyFormation();
  }
  getQUIZvyFormation(){
  this.quizService.getresultByquiz(this.id).subscribe(
    resse => {
    this.resal=resse.data;
    

console.log("ya rabi",resse.data);

   

    })
     
  }
}
