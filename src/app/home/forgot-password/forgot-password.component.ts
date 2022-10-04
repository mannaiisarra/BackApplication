import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formUser!: FormGroup;
  user:any;
  findUser:any;
  
  constructor(private router:Router,private fb: FormBuilder,private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
    
    this.formUser = this.fb.group({
    
      email: ['', [Validators.required]],
    

    });

    this.formUser.patchValue({
    
       email: this.user.email,
    
      

   })

  }
  Search(): void {

    
    this.forgotPasswordService.SearchByEmail(this.formUser.value).subscribe(
      res => {
        this.findUser=res.data;
        // console.log(this.findUser);
        if(res.data != null){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Code sent by email!',
            showConfirmButton: false,
            timer: 1500
          })
       
          this.router.navigateByUrl("/codeVerification");
        } else {
         

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      err => {
      
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        });
      }
      
      
     
     );
    
    }
}
