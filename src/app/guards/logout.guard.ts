import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  roles: string[] = [];
  islogin = true;
  isLoginFailed = false;
  constructor (private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      //this.authService.islogin = false;
      // if (this.tokenStorage.getToken()) {
      //   this.router.navigateByUrl("/home");
      //   return false;        
      // } else {        
      //   return true;
      // }
      
      this.authService.islogin = false;
      if (this.tokenStorage.getToken())
      {this.router.navigateByUrl("/home");
      return false;} else  {return true;}




  }
  
}
