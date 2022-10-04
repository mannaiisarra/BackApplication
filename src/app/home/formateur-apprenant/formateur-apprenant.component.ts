import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/model/roles';
@Component({
  selector: 'app-formateur-apprenant',
  templateUrl: './formateur-apprenant.component.html',
  styleUrls: ['./formateur-apprenant.component.css']
})
export class FormateurApprenantComponent implements OnInit {


  users:Users[] | undefined=[];
  base_picture=environment.base_picture;
  fileToUpload: File | null = null;
  formUser!: FormGroup;
  formUserone!: FormGroup;
  id:any;
  itemId!:number;
  user:any;
  role:any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
   roles: any;
   utilisateurSubmitted : boolean = false;
  constructor(private fb: FormBuilder, private router:Router, private activatedRouter:ActivatedRoute,private userService: UserService) {
    console.log("id from activate router ",this.activatedRouter.snapshot.params["id"])
    this.id=this.activatedRouter.snapshot.params["id"];

   }

  ngOnInit(): void {

this.generateFormUser();




    this.getAll();
    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      
   
    });
    this.userService.getUser(this.id).subscribe(res=>{
      console.log("id from get by id  ",res.data);
      this.user = res.data;

       this.formUser.patchValue({
        id: this.user.id,
         username: this.user.username,
         email: this.user.email,
         phone: this.user.phone,
         adress: this.user.adress,
         //password: this.user.password,
        

     })
 
  
  })

  this.getAllR();
  this.itemId;

  this.getAllRoles();
  

}



getAllRoles(){
  this.userService.getAllRoles().subscribe(ress=>{
    console.log("res roles : ",ress.data)
    this.role=ress.data
  

   })
}


  
  getAll(){
    this.userService.getAll().subscribe(res=>{
      console.log("res users  : ",res.data)
      this.users=res.data;
    
     

  
    
    

    // this.roles = users.roles;

    // this.showFORMATEUR = this.roles.includes('FORMATEUR');
    this.users= this.users.filter(item =>
      {
        return item.roles[0].name!== "ADMIN" && item.roles[0].name!=="SUPADMIN" && item.roles[0].name!=="FORMATEUR";
      }
      );
    })
  }
  
  removeUser(id:any){
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
        this.userService.removeUser(id).subscribe((item) => {
          console.log('item remove', item);
          this.getAll();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User has been deleted. ',
            showConfirmButton: false,
            timer: 1500
          })
        
        });
      }
    });
  }

  generateFormUser(){
    this.formUserone = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5)]],
      phone: ['', [Validators.required,Validators.minLength(5)]],
      adress: ['', [Validators.required,Validators.minLength(4)]],
      role:['',[Validators.required,Validators.minLength(0)]],
      photo: ['', [Validators.required,Validators.minLength(0)]],
  
    });
    this.utilisateurSubmitted = false;
  }
  EditUsers() {
    console.log('Done ', this.formUser.value);


    this.userService.updateUser(this.user.id,this.formUser.value).subscribe((res) => {
      console.log("Add Done ", res);
      this.getAll();
      if (res.status == 200) {
       
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Update successfully  ',
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
      this.router.navigateByUrl('/home/formateur_Apprenant')
    });

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


  handleFileInput(e: any) {
    console.log("Fine Input Done ", e.target.files[0])

    this.fileToUpload = e.target.files[0]

  }



  
  onSubmit(){

  


    console.log('role is :' , this.formUserone.value.role)
    console.log('Done ', this.formUserone.value);
    const formdata = new FormData();
    formdata.append("username", this.formUserone.get('username')!.value)
    formdata.append("email", this.formUserone.get('email')!.value)
    formdata.append("password", this.formUserone.get('password')!.value)
    formdata.append("phone", this.formUserone.get('phone')!.value)
    formdata.append("adress", this.formUserone.get('adress')!.value)
    formdata.append("role", this.formUserone.get('role')!.value)
    formdata.append("file", this.fileToUpload!);

    this.userService.addCategory(formdata).subscribe(
      data => {
        console.log(data);
        //this.isSuccessful = true;
       // this.isSignUpFailed = false;
       // this.getAll();
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'successfully added ',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("closeModalAjoutVideo").click();
        this.getAll();
      },
      
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;

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

    if(this.formUserone.invalid  ){
      console.log("here formulaire invalid : ",this.formUserone.invalid);
      this.utilisateurSubmitted = true;
      return;
    }
    }
    getbyid(id:any){
      this.userService.getUser(id).subscribe(res=>{
        console.log("id from get by id  ",res.data);
        this.user = res.data;
  
         this.formUser.patchValue({
          id: this.user.id,
           username: this.user.username,
           email: this.user.email,
           phone: this.user.phone,
           adress: this.user.adress,
           //password: this.user.password,
          
  
       })
   
    
    })
    }
}

