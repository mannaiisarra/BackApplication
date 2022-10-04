import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { environment } from 'src/environments/environment.prod';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { ForgotPasswordService } from 'src/app/_services/forgot-password.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  fileToUpload: File | null = null;
  formUser!: FormGroup;
  base_picture = environment.base_picture;
  user: any;
  id: any;
  formPassword: FormGroup;
  currentUser: any;
  //current: any;
  constructor(
    private token: TokenStorageService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    console.log(
      'id from activate router ',
      this.activatedRouter.snapshot.params['id']
    );
    this.id = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.formPassword = this.fb.group({
    
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
  
    });

    this.currentUser = this.token.getUser();
    // this.current = this.token.getUser();
    //this.user = localStorage.getItem("auth-user");
    // this.roles = this.tokenStorage.getUser().roles;
    // localStorage.setItem("role",this.roles[0]);
    console.log('user in local storage is : ', this.currentUser.id);

    //this.users = res.data;
    //  this.formCategory.get("username")?.setValue(this.users?.username)
    //  this.formCategory.get("email")?.setValue(res.data?.email)
    //  this.formCategory.get("phone")?.setValue(res.data?.phone)
    //  this.formCategory.get("adress")?.setValue(res.data?.adress)
    //  this.formCategory.get("password")?.setValue(res.data?.password)
    //  this.photo=this.base_picture+res.data?.photo

    // this.formUser = this.fb.group({
    //   username: [this.currentUser.username, [Validators.required]],
    //   email: [this.currentUser.email, [Validators.required]],
    //   phone: [this.currentUser.phone, [Validators.required]],
    //   adress: [this.currentUser.adress, [Validators.required]],
    //   role: [this.currentUser.roles[0], [Validators.required]],
    //photo: ['', [Validators.required]],

    // })

    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      role: [this.currentUser.roles[0], [Validators.required]],
    });

    this.getUserById();
  }

  getUserById() {
    this.userService.getUser(this.currentUser.id).subscribe((res) => {
      console.log('id from get by id  ', res.data);
      this.user = res.data;
      console.log('id from get by id  ', this.user.username);
      this.formUser.patchValue({
        username: this.user.username,
        email: this.user.email,
        adress: this.user.adress,
        phone: this.user.phone,
     
        // role: this.user.roles,
      });
    });
  }

  EditUsers() {
    console.log('Done ', this.formUser.value);

    this.userService
      .updateUser(this.currentUser.id, this.formUser.value)
      .subscribe((res) => {
        this.getUserById();

        console.log('Add Done ', res);
        if (res.status == 200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Good job ',
            showConfirmButton: false,
            timer: 1500
          })
    
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
   
          });
        }
        // this.reloadPage();
      });
  }
  reloadPage(): void {
    window.location.reload();
  }

 save(){
    if(this.formPassword.value.password == this.formPassword.value.newpassword){
      console.log('Done ', this.formPassword.value.password );
    this.forgotPasswordService.RestPassword(this.currentUser.id,this.formPassword.value ).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Password updated successfully ',
          showConfirmButton: false,
          timer: 1500
        })
     console.log(" ok") ;
       // this.isSubmit=true;
       // this.router.navigateByUrl("/Restpassword");
      },
     
      err => {
        
      
       
    

      }
      
      );
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'repeat another time!',
        showConfirmButton: false,
        timer: 1500
      })
    }
      }


  
}
