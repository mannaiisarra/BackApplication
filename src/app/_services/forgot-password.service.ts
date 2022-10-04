import { Injectable } from '@angular/core';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';

import { Dataresponse } from './../model/Dataresponse';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8055/forgot';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  SearchByEmail(data: any): Observable<Dataresponse<Users>> {
    return this.http.post<Dataresponse<Users>>(API_URL + '/send', data);
  }

 FindByCode(data: any): Observable<Dataresponse<Users>> {
    return this.http.post<Dataresponse<Users>>(API_URL + '/findByiD', data);
    
  }
  RestPassword(id:any,data: any): Observable<Dataresponse<Users>> {
    return this.http.post<Dataresponse<Users>>(API_URL + `/Rest/${id}`, data);
    
  }
}
