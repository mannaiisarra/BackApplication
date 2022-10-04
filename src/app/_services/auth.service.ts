import { Users } from 'src/app/model/users';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponseObject } from 'src/app/model/DataResponseObject';


const AUTH_API = 'http://localhost:8055/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  islogin = false;
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      email,
      password,
      
    });
  }

  register(username: string, email: string, password: string, phone:string, adress:string) :Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      username,
      email,
      password,
      phone,
      adress
      
    });
  }

  getAllusers(): Observable<DataResponseObject<Users>> {
    return this.http.get<DataResponseObject<Users>>(AUTH_API +'/');
  }


}

