import {Formation } from 'src/app/model/formation';
import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/_services/formation.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  formFormation !: FormGroup;
  fileToUpload: File | null = null;
  formations:any ;
  base_picture=environment.base_picture;
  users:any ;
  id:any;


  constructor(private fb: FormBuilder,private formationService: FormationService) { }
  ngOnInit(): void {

     
    this.formFormation = this.fb.group({
      date_deDebut: ['', [Validators.required]],
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      date_defin: ['', [Validators.required]],
      users_id: ['', [Validators.required]],

     

    });

   this.getAll();
  }
  // getAllFormationNotActive(){
  //   let formation={
  //     fin_date:new Date()
  //   }
  //   this.formationService.FormationNotActive(formation).subscribe(res=>{
  //     this.formations=res.data;
  //     console.log("formation not active is :",res);
  //   })
  // }


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
        this.formationService.removeFR( id).subscribe((item) => {
          console.log('item remove', item);
          this.getAll();
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        });
      }
    });
  }


  getAll(){
    this.formationService.getAllArchive().subscribe(res=>{
     console.log("res formationnnnnnnnnnnnnnnnnnnnnnnn : ",res.data)
    this.formations=res.data;
    console.log("formateur ",this.formations[0].demandes[0].users.email)
    })
  }
}
