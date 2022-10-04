import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  islogin = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.islogin = true;
        const user = this.tokenStorage.getUser();
        this.roles = user.roles;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'welcome ',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/home/formateur_Apprenant')  
       // this.reloadPage();
      },
      err => {
        
        Swal.fire({
         
         
      
      
        });

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'repeat another time!',
          showConfirmButton: false,
          timer: 1500
        })
    

      }
      
    
   
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

}


