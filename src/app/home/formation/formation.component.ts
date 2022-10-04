import {Formation } from 'src/app/model/formation';
import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/_services/formation.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserService } from 'src/app/_services/user.service';
import { Roles } from 'src/app/model/roles';
import { DemandeService } from 'src/app/_services/demande.service';
import { ArchiveService } from 'src/app/_services/archive.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formFormation !: FormGroup;
  fileToUpload: File | null = null;
  formations:any ;
  base_picture=environment.base_picture;
  users:any ;
  utilisateurSubmitted : boolean = false;
  id:any;
  demande:any;
  forma:any
    constructor(private userService: UserService,private archiveService: ArchiveService,private fb: FormBuilder,private formationService: FormationService,private router:Router,private demandeService:DemandeService,private datePipe:DatePipe) { }
  
    ngOnInit(): void {
      this.generateFormUser();
      console.log("here admin")
      this.formFormation = this.fb.group({
        date_deDebut: ['', [Validators.required]],
        titre: ['', [Validators.required,Validators.minLength(4)]],
        description: ['', [Validators.required,Validators.minLength(7)]],
        photo: ['', [Validators.required]],
        date_defin: ['', [Validators.required]],
        users_id: ['', [Validators.required,Validators.minLength(0)]],
        archiver: ['', [Validators.required]],
       
  
      });

      console.log('file is :' , this.formFormation.value.photo)
     
    this.getAll();
      this.getAllDemande(); 
      this. getAllUsers();
    //  this.getAllFormationActive();

    }

    // getAllFormationActive(){
    //   let formation={
    //     fin_date:new Date()
    //   }
    //   this.formationService.FormationActive(formation).subscribe(res=>{
    //     this.formations=res.data;
    //     console.log("formation active is :",res);
    //   })
    // }

    getAll(){
      this.formationService.getAll().subscribe(res=>{
       console.log("res formation : ",res.data)
      this.formations=res.data;
      console.log("formateur ",this.formations[0].demandes[0].users.email)
      })
    }
  
    handleFileInput(e: any) {
      console.log("Fine Input Done ", e.target.files[0])
  
      this.fileToUpload = e.target.files[0]
  
    }
    onSubmit(): void {
     // console.log('role is :' , this.formFormation.value.role)
    // var datePipe=new DatePipe();

   
      console.log('Done ', this.formFormation.value);
      const formdata = new FormData();
      formdata.append("date_deDebut", this.formFormation.get('date_deDebut')!.value)
      formdata.append("description", this.formFormation.get('description')!.value)
      formdata.append("file", this.fileToUpload!)
      formdata.append("date_defin", this.formFormation.get('date_defin')!.value)
      formdata.append("titre", this.formFormation.get('titre')!.value);
      formdata.append("users_id", this.formFormation.get('users_id')!.value);
  
      
  
      this.formationService.addFormation(formdata).subscribe(
        res => {
          console.log(res.data);
          this.forma=res.data
          //this.isSuccessful = true;
         // this.isSignUpFailed = false;
    
         this.getAll();
         this.demandeService.addDemande({date:new Date()},this.forma.id,this.formFormation.value.users_id).subscribe(
          ress => {
            console.log(ress.data);
            document.getElementById("closeModalAjout").click();
         
          })
          //service demande Ajoute demande pour formateur selectionner


          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Training added successfully',
            showConfirmButton: false,
            timer: 1500
          })
  
        },
     
        err => {
        
          Swal.fire({
           
           
        
        
          });

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
  
       if(this.formFormation.invalid  ) {
        console.log("here formulaire invalid : ",this.formFormation.invalid);
        this.utilisateurSubmitted = true;
        return;
      }
     
  
  
 
      
      }
  
        removeFormation(id:any){
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
            this.formationService.removeFormation( id).subscribe((item) => {
              console.log('item remove', item);
              this.getAll();
              Swal.fire('Deleted!', 'Training has been deleted.', 'success');
            });
          }
        });
      }

      getAllDemande () {


        this.formationService.getAllDemande().subscribe(
          res => {
            this.demande = res.data;
            console.log('all demande By Formation',  res.data );
      
            //this.isSuccessful = true;
           // this.isSignUpFailed = false;
           // this.getAll();
      
          }
          
          
         
         );
      
        }


        getAllUsers(){
          this.userService.getAll().subscribe(res=>{
           console.log("get all users : ",res.data)
          this.users=res.data;

          this.users= this.users.filter(item =>
            {
              return item.roles[0].name!== "ADMIN" &&   item.roles[0].name!== "SUPADMIN" && item.roles[0].name!== "APPRENANT";
            }
            );
    
          })
        }


        generateFormUser(){
          this.formFormation = this.fb.group({
            date_deDebut: ['', [Validators.required]],
            titre: ['', [Validators.required,Validators.minLength(4)]],
            description: ['', [Validators.required,Validators.minLength(7)]],
            photo: ['', [Validators.required]],
            date_defin: ['', [Validators.required]],
            users_id: ['', [Validators.required,Validators.minLength(0)]],
            archiver: ['', [Validators.required]],
           
      
          });
          this.utilisateurSubmitted = false;
        }
    

 
  }
  