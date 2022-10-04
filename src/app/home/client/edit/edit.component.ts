import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/model/users';

import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formCategory!: FormGroup;
  fileToUpload: File | null = null;
  category:any;

id:any;
photo:any;
constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private userService: UserService)  {
 console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
 this.id=this.activatedRouter.snapshot.params["id"];

}

ngOnInit(): void {

 this.formCategory = this.fb.group({
   username: ['', [Validators.required]],
   email: ['', [Validators.required]],
   phone: ['', [Validators.required]],
   adress: ['', [Validators.required]],
   password: ['', [Validators.required]],
   

 });
 this.userService.getUser(this.id).subscribe(res=>{
   console.log("id from get by id  ",res.data);
   this.category = res.data;

    this.formCategory.patchValue({
      username: this.category.username,
      email: this.category.email,
      phone: this.category.phone,
      adress: this.category.adress,
      password: this.category.password,
     

  })
   // this.formCategory.get("username")?.setValue(res.data?.username)
   // this.formCategory.get("email")?.setValue(res.data?.email)
   // this.formCategory.get("phone")?.setValue(res.data?.phone)
   // this.formCategory.get("adress")?.setValue(res.data?.adress)
   // this.formCategory.get("password")?.setValue(res.data?.password)
  
  


  })
}

handleFileInput(e: any) {
 console.log("Fine Input Done ", e.target.files[0])

 this.fileToUpload = e.target.files[0]

}


edit() {


 this.userService.updateUser(this.id,this.formCategory.value).subscribe((res) => {
   console.log("Add Done ", res);
   if (res.status == 200) {
     Swal.fire('Good job!', 'You clicked the button!', 'success');
     this.router.navigate(["listclient"]);
   } else {
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Something went wrong!',
       footer: '<a href="">Why do I have this issue?</a>',
     });
   }
 });

}



}

