import { Injectable } from '@angular/core';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';

import { Dataresponse } from './../model/Dataresponse';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8055/api/auth';
const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string=localStorage.getItem(TOKEN_KEY);
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
  constructor(private http: HttpClient) { }

  
   getAll(): Observable<Dataresponse<Users>> {
    return this.http.get<Dataresponse<Users>>(API_URL +'/');
  }
  register(username: string, email: string, password: string, phone:string, adress:string) :Observable<any> {
    return this.http.post(API_URL + '/signup', {
      username,
      email,
      password,
      phone,
      adress
      
    },this.httpOptions);
  }
  removeUser(id: string): Observable<Dataresponse<Users>> {
    return this.http.delete<Dataresponse<Users>>(API_URL + '/deleteUser/' + id,this.httpOptions);
  }

  getUser(id:any): Observable<Dataresponse<Users>> {
    return this.http.get<Dataresponse<Users>>(API_URL+'/findById/'+id,this.httpOptions);
  }

  updateUser(id: string, data: any): Observable<Dataresponse<Users>> {
    return this.http.put<Dataresponse<Users>>(API_URL +'/updateUser/'+ id, data,this.httpOptions);
  }
  // addUser(data: any): Observable<Dataresponse<Users>> {
  //   return this.http.post<Dataresponse<Users>>(API_URL, data);
  // }

  addCategory(data: any): Observable<Dataresponse<Users>> {
    return this.http.post<Dataresponse<Users>>(API_URL + '/signup', data,this.httpOptions);
  }
  
  getAllRoles(): Observable<Dataresponse<Roles>> {
    return this.http.get<Dataresponse<Roles>>(API_URL +'/roles',this.httpOptions);
  }
  Search(email:any): Observable<Dataresponse<Users>> {
    return this.http.post<Dataresponse<Users>>(API_URL + '/findbyEmail', email,this.httpOptions);
  }

  SearchByEmail(data: any): Observable<Dataresponse<Users>> {
    return this.http.post<Dataresponse<Users>>(API_URL + '/send', data,this.httpOptions);
  }
  getUserByNickname(username:any): Observable<Dataresponse<Users>> {
    return this.http.get<Dataresponse<Users>>(API_URL+'/findByName/'+username,this.httpOptions);
  }
}