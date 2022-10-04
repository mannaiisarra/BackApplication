import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent implements OnInit {

  formUser: FormGroup;
  user:any;
  findUser:any;
  isSubmit=false;
  formPassword: FormGroup;
  constructor(private router:Router,private fb: FormBuilder,private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {

    this.formPassword = this.fb.group({
    
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
  
    });
  


    this.formUser = this.fb.group({
    
      code: ['', [Validators.required]],
    

    });

    this.formUser.patchValue({
    
      code: this.user.code,
    
      

   })

   
  }
  VerificationCode(): void {

    
    this.forgotPasswordService.FindByCode(this.formUser.value).subscribe(
      res => {
        this.findUser=res.data;
        console.log(this.findUser.id);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'code correct!',
          showConfirmButton: false,
          timer: 1500
        })
        this.isSubmit=true;
       // this.router.navigateByUrl("/Restpassword");
      },
      err => {-
      
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
         
        });
      }
      
      
     
     );
    
    }


    save(){
      if(this.formPassword.value.password == this.formPassword.value.newpassword){
        console.log('Done ', this.formPassword.value.password );
      this.forgotPasswordService.RestPassword(this.findUser.id,this.formPassword.value ).subscribe(
        res => {
//this.findUser=res.data;
       //   console.log(this.findUser.id);
       console.log(" ok") ;
         // this.isSubmit=true;
         // this.router.navigateByUrl("/Restpassword");
        }, );
      }
      else{
        console.log("Not ok") ;
      }
        }
        
        
       
      




   
}
