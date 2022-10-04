import { Component, OnInit,ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepsService } from 'src/app/_services/steps.service';
import { Etape } from 'src/app/model/etape';
import { CoursService } from 'src/app/_services/cours.service';
import { VideoService } from 'src/app/_services/video.service';
import { QuizService } from 'src/app/_services/quiz.service';
import {MatAccordion} from '@angular/material/expansion';
import { environment } from 'src/environments/environment.prod';
import { Quiz } from 'src/app/model/quiz';
import { ThemeService } from 'src/app/_services/theme.service';
import { Cours  } from 'src/app/model/cours';
import { QuestionService } from 'src/app/_services/question.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  step = 0;


  formQuestion!: FormGroup;
dataarray=[];
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  formStep!: FormGroup;

  formQuiz!: FormGroup;
  utilisateurSubmitted : boolean = false;
  etape:any;
  etapes:any ;
  cours:any;
  id_etape:any;
  etapee:any
  panelOpenState = false;
  fileToUpload: File | null = null;
  coursByEtape:any;
  value = 'Clear me';
  base_picture=environment.base_picture;
  id:string=this.activatedRouter.snapshot.params["id"];
  theme:any;

  correct: any = {};
  quusu:any;
video:any;
  responses:any;
  etapess:any;
  courss:any;
  formEtape:FormGroup;
  themes:any;
  formCours:FormGroup;
  formCour:FormGroup;
  question:any;
  formVideo:FormGroup;
  videoo:any;
  quizzz: Quiz = {} as Quiz;
quizz:any;
  quiz:any={
    id:0,title:'',description:'',numberOfQuestions:'',maxMarks:"",active:false
  }

  constructor(private datePipe:DatePipe,private stepService: StepsService,private videoService: VideoService,private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private coursService:CoursService,private quizService: QuizService,private themeService:ThemeService,private questionService:QuestionService) { 
    
    
  }

  ngOnInit(): void {
this.gettheme();
this.generateFormVideo();
    this.generateFormStep();
this.generateFormCours();
this.generateFormQuiz();
    this.formVideo = this.fb.group({
   
      name: ['', [Validators.required,Validators.minLength(3)]],
      photo: ['', [Validators.required, Validators.minLength(0)]],
      etape_id_etape: ['', [Validators.required,, Validators.minLength(0)]],
    });

  
    this.formQuiz = this.fb.group({
      id: '',
      active: '',
      title: '',       
      description: '',   
      numberOfQuestions: '',   
      maxMarks: '',   
      etape_id_etape: '', 
    })
  //   this.formQuiz.patchValue({
  //     id: '',
  //     active: '',
  //     title: '',       
  //     description: '',   
  //     numberOfQuestions: '',   
  //     maxMarks: '',   
  //     etape_id_etape: '', 
  
  // })


    this.dataarray.push(this.quiz);
    this.formEtape = this.fb.group({
      etapeID: ['', [Validators.required,, Validators.minLength(0)]],

    
      active: '',
      title: '',       
      description: '',   
      numberOfQuestions: '',   
      maxMarks: '', 
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
   // this.getAllNameStapes();
    this.getThemeById(); 

    
    console.log("id from activate router ",this.id) 

      this.formStep = this.fb.group({
        step_titre: ['', [Validators.required,Validators.minLength(3)]],
        description: ['', [Validators.required,,Validators.minLength(3)]],
        nombre_des_heurs: ['', [Validators.required,,Validators.minLength(0)]],
        name: ['', [Validators.required,,Validators.minLength(2)]],
        etapeType: ['', [Validators.required,,Validators.minLength(0)]],
        date: ['', [Validators.required]],
      });
  //   this.formStep.patchValue({
  //     step_titre: '',
  //     description: '',
  //     nombre_des_heurs: '',
  //     name:'',
  //     etapeType:'',
  //     date:'',
  //    // formation: '',       

  // })


  this.formCours = this.fb.group({
    description: ['', [Validators.required,Validators.minLength(0)]],
    photo: ['', [Validators.required,Validators.minLength(0)]],
    date: ['', [Validators.required]],
    etape_id_etape: ['', [Validators.required,Validators.minLength(1)]],
  });
  this.formCour = this.fb.group({
    description: ['', [Validators.required]],
    photo: ['', [Validators.required]],
    date: ['', [Validators.required]],
  
  });





//   this.formStep.patchValue({
//     description: '',
//     photo: '',

// })

  this.getEtapeByTheme();
this.getThemeById();


 
  }

  addetape() {
   
    this.formStep.get("date")?.setValue(this.datePipe.transform(new Date(),"yyyy-MM-dd"))

    
 
    this.stepService.addSteps(this.formStep.value,this.id).subscribe(
      data => {
        console.log("add new etapes",data);
        this.getEtapeByTheme();
        Swal.fire('Good job!', 'You clicked the button!', 'success');
        document.getElementById("closeModalAjout").click();

      },
      err => {
      
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        
        });
      }
      
      
     
     );
     if(this.formStep.invalid  ){
      console.log("here formulaire invalid : ",this.formStep.invalid);
      this.utilisateurSubmitted = true;
  
      return;
    }
  
    
    }

    getEtapeByTheme(){
      this.stepService.getEtapeByTheme(this.id).subscribe(res=>{
       
        this.etape = res.data;    
        console.log("etape by iddddddddddddddddd  ", this.etape);
  
      })
      this.formQuiz = this.fb.group({
        id: '',
        active: '',
        title: '',       
        description: '',   
        numberOfQuestions: '',   
        maxMarks: '',   
        etape_id_etape: '', 
      })
  
    }
    
    gettheme(){
      this.themeService.getThemeById(this.id).subscribe(res=>{
        this.themes=res.data
        console.log("Get ThemeBy id  ",this.themes.formation.id);
 
         
    
      })
    
    }

    // getAllNameStapes(){
    //   this.stepService.getAllNameOfStapes().subscribe(res=>{
    //     console.log("etape by nameeeeeeddd okk  ",res.data);
    //     this.etapes = res.data;
    //     //this.getEtapeByTheme();
      
         
    
    //   })
    
    // }

    removeEtape(id:any){
      console.log(" Product deleted", id)
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
          this.stepService.removeEtape(id).subscribe((item) => {
            this.getEtapeByTheme();
            console.log('item remove', item);
     

           
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          });
        }
      })

    }
    
    
   
    handleFileInput(e: any) {
      console.log("Fine Input Done ", e.target.files[0])
  
      this.fileToUpload = e.target.files[0]


  
    }


    onSubmit(): void {
      console.log('role is :' , this.formCours.value.role)
      console.log('Done ', this.formCours.value);
      this.formCours.get("date")?.setValue(this.datePipe.transform(new Date(),"yyyy-MM-dd"))

      const formdata = new FormData();
      formdata.append("description", this.formCours.get('description')!.value)
      formdata.append("date", this.formCours.get('date')!.value)
      formdata.append("etape_id_etape", this.formCours.get('etape_id_etape')!.value)
      formdata.append("file", this.fileToUpload!);
    
  
      this.coursService.addCoursByEtape(formdata, this.formCours.value.etape_id_etape	).subscribe(
        res => {
          document.getElementById("closeModalAjoutcours").click();

            this.cours=res.data;
            this.getEtapeByTheme();
            console.log("cours is ",this.cours);
//this.cours = new Cours();
          Swal.fire('Good job!', 'You clicked the button!', 'success');
        
  
        }
     
 
        
       
       );
       if(this.formCours.invalid  ){
        console.log("here formulaire invalid : ",this.formCours.invalid);
        this.utilisateurSubmitted = true;
    
        return;
      }
      }
   


      getEtapeById(id:any){
        this.stepService.getSteps(id).subscribe(res=>{
         
          this.etapee = res.data;
          console.log("etape by idddd2  ", this.etapee.theme.id);
        
           
      
        })
      
      }
  
      

      // getAllR(){
      //   this.userService.getAllRoles().subscribe(res=>{
      //     console.log("res roles : ",res.data)
      //     this.roles=res.data
      //     this.roles= this.roles.filter(item =>
      //       {
      //         return item.name!== "ADMIN" &&   item.name!== "SUPADMIN" &&   item.name!== "SUPADMIN";
      //       }
      //       );
        
    
      //    })
      // }
      // setResponse() {
      //   this.quiz.correct = this.correct;
      //  }



       addQuizf() {
        console.log("here form quiz ",this.formEtape.value)
        this.quizService.addQuiz(this.quiz,this.formEtape.value.etapeID,this.themes.formation.id).subscribe(res => {
          if (res.status == 200) {
            document.getElementById("closeModalAjoutttt").click();
          this.quiz = res.data;
          this.getEtapeByTheme();
   
   
          Swal.fire('Good job!', 'You clicked the button!', 'success');

          console.log(this.quiz);
         
     
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
         
            });
          }
    
 
        })
      }
      // findResponse(id: number) {
      //   this.quizService.getQuizById(id).subscribe(res => {
      //     this.responses = res.data;
      //   })
      //   }

        getThemeById() {
          this.themeService.getThemeById(this.id).subscribe(res => {
            this.theme = res.data;
            console.log("get all themes ",this.theme );
          })
          }


         
          getQuizById(id:any){
            this.quizService.getquizById( id	).subscribe(res=>{
             
              this.quizz = res.data;
              console.log("get quiz By id  ", this.quizz);
            
              this.formQuiz.patchValue({
                id: this.quizz.id,
                active: this.quizz.active,
                title: this.quizz.title,
                description: this.quizz.description,
                numberOfQuestions: this.quizz.numberOfQuestions,
                maxMarks: this.quizz.maxMarks,
                etape_id_etape: this.quizz.etape_id_etape,
                 //password: this.user.password,
                
        
             })
                
          
            })
          }
          removeCours(id:any){
            console.log(" delate cours", id)
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
                this.coursService.removeCours(id).subscribe((item) => {
                  this.getEtapeByTheme();
                  console.log('item remove', item);
              
                  Swal.fire('Deleted!', 'User has been deleted.', 'success');
                });
              }
            });
          }



          EditCours()  {
     
            console.log('Done ', this.formCours.value);
            this.formCours.get("date")?.setValue(this.datePipe.transform(new Date(),"yyyy-MM-dd"))
        
          
             const formdata = new FormData();
             formdata.append("description", this.formCours.get('description')!.value)
             formdata.append("file", this.fileToUpload!)
             formdata.append("date", this.formCours.get('date')!.value)
             formdata.append("etape_id_etape", this.formCours.get('etape_id_etape')!.value);

        
            this.coursService.updateCours(this.courss.id,formdata).subscribe((res) => {

              console.log("Add Done ", res.data);
              if (res.status == 200) {
                document.getElementById("closeModalupdatecours").click();
                this.getEtapeByTheme();
                Swal.fire('Good job!', 'You clicked the button!', 'success');
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                
                });
              }
            });
        
          }

          getCoursById(id:any){
            this.coursService.getUserByDemande( id	).subscribe(res=>{
             
              this.courss = res.data;
              console.log("get cours By id  ", this.courss);
         //   this.updateQuiz();
         this.formCours.patchValue({
          id: this.courss.id,
          description: this.courss.description,
          photo: this.courss.photo,
          date: this.courss.date,
          etape_id_etape: this.courss.etape_id_etape,
           //password: this.user.password,
          
  
       })
          
            })
          }
          removeQuiz(id:any){
            console.log(" delate cours", id)
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
                this.quizService.removeCours(id).subscribe((item) => {
                  this.getEtapeByTheme();
                  console.log('item remove', item);
              
                  Swal.fire('Deleted!', 'User has been deleted.', 'success');
                });
              }
            });
          }

          updateQuiz() {

    
            this.quizService.updateCours(this.quizz.id,this.formQuiz.value).subscribe(
              data => {
                document.getElementById("closeModalAjouttxst").click();
                
                console.log(data);
                this.getEtapeByTheme();
                Swal.fire('Good job!', 'You clicked the button!', 'success');
                document.getElementById("closeModalAjout").click();
        
              },
              err => {
              
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  footer: '<a href="">Why do I have this issue?</a>',
                });
              }
              
              
             
             );
            
            }




            addVideoByEtape() {
         
              console.log('Done ', this.formVideo.value);
              const formdata = new FormData();
              formdata.append("name", this.formVideo.get('name')!.value)
              formdata.append("etape_id_etape", this.formVideo.get('etape_id_etape')!.value)
              formdata.append("file", this.fileToUpload!);
              
          
              this.videoService.addVideoByEtape(formdata, this.formVideo.value.etape_id_etape	).subscribe(
                res => {
                  this.getEtapeByTheme();
                    this.video=res.data;
                    
                    console.log("video is ",this.video);
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: ' added successfully',
                      showConfirmButton: false,
                      timer: 1500
                    })
                
                  document.getElementById("closeModalAjoutVideo").click();
                
          
                }, 
                err => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                  })
        
                }
          
             
         
                
               
               );
               if(this.formVideo.invalid  ){
                console.log("here formulaire invalid : ",this.formVideo.invalid);
                this.utilisateurSubmitted = true;
                return;
              }
          
              }


              removeVideo(id:any){
                console.log(" delate cours", id)
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
                    this.videoService.removeVideo(id).subscribe((item) => {
                      this.getEtapeByTheme();
                      console.log('item remove', item);
                  
                      Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    });
                  }
                });
              }

              getVideoById(id:any){
                this.videoService.findVideoByid( id	).subscribe(res=>{
                 
                  this.videoo = res.data;
                  console.log("get videoo By id  ", this.videoo);
             //   this.updateQuiz();
             this.formVideo.patchValue({
              id: this.videoo.id,
              name: this.videoo.name,
              photo: this.videoo.photo,
    
              etape_id_etape: this.videoo.etape_id_etape,
               //password: this.user.password,
              
          
           })
              
                })
              }


              EditVideo()  {
     
                console.log('Done ', this.formVideo.value);
            
              
                 const formdata = new FormData();
                 formdata.append("name", this.formVideo.get('name')!.value)
                 formdata.append("file", this.fileToUpload!)
                 formdata.append("etape_id_etape", this.formVideo.get('etape_id_etape')!.value);
    
            
                this.videoService.updateVideo(this.videoo.id,formdata).subscribe((res) => {
    
                  console.log("Add Done ", res.data);
                  if (res.status == 200) {
                    document.getElementById("closeModalupdatevideo").click();
                    this.getEtapeByTheme();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: ' add successfully',
                      showConfirmButton: false,
                      timer: 1500
                    })
          
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
                if(this.formVideo.invalid  ){
                  console.log("here formulaire invalid : ",this.formVideo.invalid);
                  this.utilisateurSubmitted = true;
                  return;
                }
            
              }

              generateFormStep(){
                this.formStep = this.fb.group({
                  step_titre: ['', [Validators.required,Validators.minLength(3)]],
                  description: ['', [Validators.required,,Validators.minLength(3)]],
                  nombre_des_heurs: ['', [Validators.required,,Validators.minLength(0)]],
                  name: ['', [Validators.required,,Validators.minLength(2)]],
                  etapeType: ['', [Validators.required,,Validators.minLength(0)]],
                  date: ['', [Validators.required]],
                });
                this.utilisateurSubmitted = false;
              }


              generateFormCours(){
                this.formCours = this.fb.group({
                  description: ['', [Validators.required,Validators.minLength(0)]],
                  photo: ['', [Validators.required,Validators.minLength(0)]],
                  date: ['', [Validators.required]],
                  etape_id_etape: ['', [Validators.required,Validators.minLength(1)]],
                });
                this.utilisateurSubmitted = false;
              }

              generateFormVideo(){
                this.formVideo = this.fb.group({
   
                  name: ['', [Validators.required,Validators.minLength(3)]],
                  photo: ['', [Validators.required, Validators.minLength(0)]],
                  etape_id_etape: ['', [Validators.required,, Validators.minLength(0)]],
                });
            
                this.utilisateurSubmitted = false;
              }


              generateFormQuiz(){
                this.formEtape = this.fb.group({
                  etapeID: ['', [Validators.required,, Validators.minLength(0)]],
            
                
                  active: '',
                  title: '',       
                  description: '',   
                  numberOfQuestions: '',   
                  maxMarks: '', 
                })
            
                this.utilisateurSubmitted = false;
              }
             
    
}
