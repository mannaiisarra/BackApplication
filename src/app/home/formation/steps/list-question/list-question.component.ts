import { Component, OnInit,ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { environment } from 'src/environments/environment.prod';

import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
 id:any;
  questions:any;
  correct: any = {};
  utilisateurSubmitted : boolean = false;
  questionupdate:any;
  questinn:any;
  question: Question = {} as Question;
  formQuestion!: FormGroup;
  formQuestionn!: FormGroup;
  questionsByid:Question = {} as Question;
  constructor(private questionService:QuestionService,private router:Router, private activatedRouter:ActivatedRoute,private fb: FormBuilder) { 


    console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
    this.id=this.activatedRouter.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.getquzqtionByid();


    
    this.formQuestion = this.fb.group({
      question: ['', [Validators.required]],
      response1: ['', [Validators.required]],
      response2: ['', [Validators.required]],
      response3: ['', [Validators.required]],
      correct: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      
   
    });


    this.questionService.getQuestionById(this.id).subscribe(res=>{
      console.log("id from get by id  ",res.data);
      this.questionsByid = res.data;

       this.formQuestion.patchValue({
     
        question: this.questionsByid.question,
        response1: this.questionsByid.response1,
        response2: this.questionsByid.response2,
         response3: this.questionsByid.response3,
         correct: this.questionsByid.correct,
         //password: this.user.password,
        

     })
 
  
  })

  }




  getquzqtionByid(){
    this.questionService.getQuestion(this.id).subscribe(res=>{
      console.log("question by id quiz  ",res.data);
      this.questions = res.data;    
    
       
  
    })
    this.formQuestion = this.fb.group({
      quesId:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      image:'',
      answer:'',
      givenAnswer:''
    })


  }


  removeQuestion(id:any){
    console.log(" l'id de Formation deleted", id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.removeQuestion(id).subscribe((item) => {
          console.log('item remove', item);
          this.getquzqtionByid();
          Swal.fire('Deleted!', 'Question has been deleted.', 'success');
        });
      }
    });
  }


  getAll() {


    this.questionService.getAll().subscribe(
      res => {
     
        console.log('all demande By question',  res.data );
  
        //this.isSuccessful = true;
       // this.isSignUpFailed = false;
       // this.getAll();
  
      }
      
      
     
     );
  
    }



   
  


    addQuestion() {
 
      this.questionService.addQuestion(this.question,this.id).subscribe(res => {
        this.question = res.data;
   
     console.log(this.question);
     if (res.status == 200) {
      this.getquzqtionByid();
      Swal.fire('Good job!', 'You clicked the button!', 'success');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: ' Add successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.question = new Question();
     
      document.getElementById("closeModalAjout").click();

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        showConfirmButton: false,
        timer: 1500
      })
    }
 
  });
  if(this.formQuestion.invalid  ){
    console.log("here formulaire invalid : ",this.formQuestion.invalid);
    this.utilisateurSubmitted = true;
    return;
  }
}

setResponse() {
  this.question.correct = this.correct;
 }
//  getquesttionByid(id:any){
//   this.questionService.getQuestionById(id).subscribe(res=>{
//     console.log("question by id quiz  ",res.data);
//     this.questionsByid = res.data;    
  
     

//   })
// }
// EditQuestion() {
//   console.log('Done ', this.formQuestion.value);


//   this.questionService.updateQuestion(this.id,this.formQuestion.value).subscribe((res) => {
//     console.log("Add Done ", res);
//     if (res.status == 200) {
//       Swal.fire('Good job!', 'You clicked the button!', 'success');
     
//     } else {
//       Swal.fire({
//         icon: 'error',  
//         title: 'Oops...',
//         text: 'Something went wrong!',
//         footer: '<a href="">Why do I have this issue?</a>',
//       });
//     }
//     this.router.navigateByUrl('/home/formateur_Apprenant')
//   });

// }
QuizUpdate(id:any){
  this.questionService.getQuestionById(id).subscribe(res=>{
    console.log("id from get by id  ",res.data);
    this.questionsByid = res.data;

    
  //  this.formQuestion = this.fb.group({
    
  //   quesId: [this.questionsByid.quesId],
  //   question: [this.questionsByid.question],
  //   response1: [this.questionsByid.response1],
  //   response2: [this.questionsByid.response2],
  //    response3: [this.questionsByid.response3],
  //    correct: [this.questionsByid.correct],
  // })

})

}


EditQuestion() {

console.log("id",+ this.questionsByid.quesId)

  this.questionService.updateQuestion(this.questionsByid.quesId,this.questionsByid).subscribe((res) => {
    console.log("Add Done ", res);
    this.questionsByid = res.data;
    this.getquzqtionByid();
    if (res.status == 200) {
      Swal.fire('Good job!', 'Information updated successfully', 'success');
    
     
      document.getElementById("closeModalAjoutt").click();
    } else {
      Swal.fire({
        icon: 'error',  
        title: 'Oops...',
        text: 'Something went wrong!',
        
      });
    }
  });

}


}
