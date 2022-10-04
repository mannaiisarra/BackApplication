import { Demande } from 'src/app/model/demande';
import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_services/demande.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demande:any;
  formation:any;
  demandeActive:any;
  formDemande!: FormGroup;
  formFormation!: FormGroup;
  base_picture=environment.base_picture;
  constructor(private demandeService: DemandeService,private fb: FormBuilder) { }

  ngOnInit(): void {
  

    this.getAll();
    this.formDemande = this.fb.group({
      active: ['', [Validators.required]], 
      //formation: [this.id, [Validators.required]],
    });
    this.formDemande.patchValue({
      active: '',
     // formation: '',       

  })

  this.formDemande = this.fb.group({
    id: ['', [Validators.required]], 
    //formation: [this.id, [Validators.required]],
  });
  this.formDemande.patchValue({
    id: '',
   // formation: '',       

})



  }


  getAll(){
    this.demandeService.getAll().subscribe(res=>{
     console.log("res formationdd : ",res.data)
    this.formation=res.data;

   
    })
  }

  activeAprenent(id:any){
    console.log("here service update state demande ");

    this.demandeService.updatedemandee(id,this.formDemande.value).subscribe(res=>{
      console.log("redsdcds : ",res.data);
      this.NotActive();
      this.getByid(id);
   
    
     })
  }
NotActive(){
  this.demandeService.getNotActive().subscribe(
    res => {
      console.log("res demande Not Active : ",res.data)
      this.demande=res.data;

    })
}



Active(){
  this.demandeService.getDemandetActive().subscribe(
    res => {
      console.log("res demande  Active : ",res.data)
      this.demandeActive=res.data;
      this.demandeActive= this.demandeActive.filter(item =>
        {
          return item.users.roles[0].name!== "ADMIN" &&   item.users.roles[0].name!== "SUPADMIN" && item.users.roles[0].name!== "FORMATEUR";
        }
        );

    })
}


removeTheme(id:any){
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
      this.demandeService.removeDemande(id).subscribe((item) => {
        console.log('item remove', item);
     
     this.getByid(id);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      });
    }
  })
}
// only demnde active false
onSubmit(id:any) {


  this.demandeService.getActiveNot(id).subscribe(
    res => {
      this.demande = res.data;
      console.log(' after select formtion Note Active requzst',  res.data );

      //this.isSuccessful = true;
     // this.isSignUpFailed = false;
     // this.getAll();

    }
    
    
   
   );

   this.demandeService.getActive(id).subscribe(
    ress => {
      //console.log('dddddddddd',ress.data);
   
      this.demandeActive=ress.data;
      console.log(' Active requzst',  this.demandeActive );
      //this.isSuccessful = true;
     // this.isSignUpFailed = false;
     // this.getAll();

    }
    
    
   
   );


  }
// only active demande 
  onSubmitt(id:any) {


    this.demandeService.getActive(id).subscribe(
      ress => {
        //console.log('dddddddddd',ress.data);
     
        this.demandeActive=ress.data;
        console.log(' Active requzst',  this.demandeActive );
        //this.isSuccessful = true;
       // this.isSignUpFailed = false;
       // this.getAll();
  
      }
      
      
     
     );
  
    }

getByid(id:any){
  this.demandeService.getActive(id).subscribe(
    ress => {
      //console.log('dddddddddd',ress.data);
   
      this.demandeActive=ress.data;
      console.log(' Active requzst',  this.demandeActive );
      //this.isSuccessful = true;
     // this.isSignUpFailed = false;
     // this.getAll();

    }
    
    
   
   );
}
}
