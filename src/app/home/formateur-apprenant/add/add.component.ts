import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/_services/user.service';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formUser!: FormGroup;
  users:Users[] | undefined=[];
  roles:Roles[] ;
  fileToUpload: File | null = null;
  itemId!:number;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private userService: UserService,private fb: FormBuilder, private router:Router) { }
  ngOnInit(): void {

    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      role:['',[Validators.required]],
      photo: ['', [Validators.required]],

    });
    this.getAllR();
    this.itemId;
  } 


  onSubmit(): void {
    console.log('role is :' , this.formUser.value.role)
    console.log('Done ', this.formUser.value);
    const formdata = new FormData();
    formdata.append("username", this.formUser.get('username')!.value)
    formdata.append("email", this.formUser.get('email')!.value)
    formdata.append("password", this.formUser.get('password')!.value)
    formdata.append("phone", this.formUser.get('phone')!.value)
    formdata.append("adress", this.formUser.get('adress')!.value)
    formdata.append("role", this.formUser.get('role')!.value)
    formdata.append("file", this.fileToUpload!);

    this.userService.addCategory(formdata).subscribe(
      data => {
        console.log(data);
        //this.isSuccessful = true;
       // this.isSignUpFailed = false;
       // this.getAll();
        Swal.fire('Good job!', 'You clicked the button!', 'success');

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      
      
     
     );

    }
 

    /*this.AuthService.addCategory(username, email, password,phone,adress,photo).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        Swal.fire('Good job!', 'You clicked the button!', 'success');

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
      
      
     
    );
    */
    getAll(){
      this.userService.getAll().subscribe(res=>{
       console.log("res categories : ",res.data)
      this.users=res.data;

      })
    }

  handleFileInput(e: any) {
    console.log("Fine Input Done ", e.target.files[0])

    this.fileToUpload = e.target.files[0]

  }
  getAllR(){
    this.userService.getAllRoles().subscribe(res=>{
      console.log("res roles : ",res.data)
      this.roles=res.data
      this.roles= this.roles.filter(item =>
        {
          return item.name!== "ADMIN" &&   item.name!== "SUPADMIN";
        }
        );
    

     })
  }
}

 

