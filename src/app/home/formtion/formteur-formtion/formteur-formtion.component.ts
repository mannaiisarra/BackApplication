import { Component, OnInit } from '@angular/core';
import { DemandeService } from 'src/app/_services/demande.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-formteur-formtion',
  templateUrl: './formteur-formtion.component.html',
  styleUrls: ['./formteur-formtion.component.css']
})
export class FormteurFormtionComponent implements OnInit {
  currentUser:any;
  demande:any;
  base_picture=environment.base_picture;
  constructor(private demandeService:DemandeService , private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getAllFormationByFormateur();
  }
getAllFormationByFormateur(){
  this.demandeService.getAllDemandeByUsers(this.currentUser.id).subscribe(
    ress => {
      console.log(ress.data);
      
this.demande=ress.data;

this.demande= this.demande.filter(item =>
  {
    return item.formationn.archiver == false ;
  }
  );
   
    })
}
}
