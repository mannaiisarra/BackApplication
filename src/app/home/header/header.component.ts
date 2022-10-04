import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { DemandeService } from 'src/app/_services/demande.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  reload:boolean=true;
  base_picture=environment.base_picture;
  currentUser: any;
  user:any;
  formUser!: FormGroup;
  demande:any;
  listUser:any;
  demandess:any;
  formDemande!: FormGroup;
  public notifications:any;
  constructor(private webSocketService: WebsocketService,private demandeService: DemandeService,private fb: FormBuilder,private router:Router ,private tokenStorageService: TokenStorageService,private userService: UserService) { }

  ngOnInit(): void {
    this.NotActive();
  //   let stompClient = this.webSocketService.connect();
  //   stompClient.connect({}, frame => {

  //     stompClient.subscribe('/topic/notification'+ this.demandess ,       (response) => {

  //       this.demandess = JSON.parse(this.demandess.body).count;



  //     })

  // });  

  this.formDemande = this.fb.group({
    vu: ['', [Validators.required]], 
    //formation: [this.id, [Validators.required]],
  });
  this.formDemande.patchValue({
    vu: '',
   // formation: '',       

})
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
  NotActive(){


  this.demandeService.getNotActiveWithVueFalse().subscribe(
      res => {

  
        console.log("res demande Not Activeeeeeeeeeee : ",res.data)
        this.demande=res.data;
  
      })
  }
 ShowNotification(){
  
  this.demandeService.getNotActiveWithVueFalse().subscribe(
    res => {
    
      this.demande=res.data;
      this.demande.vu=true;
      console.log("demande : ",this.demande)

    })
 }
update(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
  });
}

 
 VueTrue(id:any){
  this.reload= true;
  console.log("tout les vues son afficher");

  this.demande.forEach(element =>{
  this.demandeService.updateVu(element.id,this.formDemande.value).subscribe(res=>{
    console.log("redsdcds : ",res.data);

    this.router.navigateByUrl("/home/listOfRequest");
        } )
      } )  
 
}

  
         
  
                   
}