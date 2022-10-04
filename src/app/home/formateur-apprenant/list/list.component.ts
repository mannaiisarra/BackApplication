import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment.prod';
import { DemandeService } from 'src/app/_services/demande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users:any;
  base_picture=environment.base_picture;
  demandes:any;
  formUser!: FormGroup;
  user:any;
  id:any;
  otherUser:any;
  constructor(private router:Router, private activatedRouter:ActivatedRoute,private fb: FormBuilder,private userService: UserService,private demandeService: DemandeService) {
    this.id=this.activatedRouter.snapshot.params["id"];
   }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      
   
    });
    this.userService.getUser(this.id).subscribe(res=>{
 
      this.user = res.data;
      console.log("id from get by iddddd  ",this.user);
       this.formUser.patchValue({
        id: this.user.id,
         username: this.user.username,
         email: this.user.email,
         phone: this.user.phone,
         adress: this.user.adress,
         //password: this.user.password,
        

     })
 
  
  })
    this.getAll();
   

  
  }
  getAll(){
    this.userService.getAll().subscribe(res=>{
      console.log("res users  : ",res.data)
      this.users=res.data;
    
     

 
    

    // this.roles = users.roles;

    // this.showFORMATEUR = this.roles.includes('FORMATEUR');
    this.users= this.users.filter(item =>
      {
        return item.roles[0].name!== "ADMIN" && item.roles[0].name!=="SUPADMIN" && item.roles[0].name!=="APPRENANT";
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
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        });
      }
    });
  }

  UserUpdate(users:any){
  console.log("users Update",this.users);

  }
  EditUsers() {
    console.log('Done ', this.formUser.value);


    this.userService.updateUser(this.user.id,this.formUser.value).subscribe((res) => {
      console.log("Add Done ", res);
      this.getAll();
      if (res.status == 200) {
        Swal.fire('Good job!', 'Information updated successfully', 'success');
       
      } else {
        Swal.fire({
          icon: 'error',  
          title: 'Oops...',
          text: 'Something went wrong!',
          
        });
      }
      this.router.navigateByUrl('/home/list')
    });

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
