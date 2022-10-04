import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    formPassword!: FormGroup;

  constructor(private fb: FormBuilder,private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {

      
    this.formPassword = this.fb.group({
    
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],

    });
  }
save(){
  


  if(this.formPassword.value.password == this.formPassword.value.newpassword){
console.log("ok");
  }else{
    console.log("Not ok") ;
  }
}



}
