
import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Theme } from 'src/app/model/theme';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8055/theme';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  token:string=localStorage.getItem(TOKEN_KEY);
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
  constructor(private http: HttpClient) { }

  removeTheme(id: string): Observable<DataResponseObject<Theme>> {
    return this.http.delete<DataResponseObject<Theme>>(API_URL + '/deleteTheme/' + id,this.httpOptions);
  }

  getThemeById(id:any): Observable<DataResponseObject<Theme>> {
    return this.http.get<DataResponseObject<Theme>>(API_URL+'/findById/'+id,this.httpOptions);
  }
  getThemeByFormation(id:any): Observable<DataResponseObject<Theme>> {
    return this.http.get<DataResponseObject<Theme>>(API_URL+'/chercher/'+id,this.httpOptions);
  }

  updateTheme(id: string, data: any): Observable<DataResponseObject<Theme>> {
    return this.http.put<DataResponseObject<Theme>>(API_URL +'/updateTheme/'+ id, data,this.httpOptions);
  }
  // addUser(data: any): Observable<Dataresponse<Users>> {
  //   return this.http.post<Dataresponse<Users>>(API_URL, data);
  // }
  addTheme(data: any,id_formation:any): Observable<DataResponseObject<Theme>> {
    return this.http.post<DataResponseObject<Theme>>(API_URL + `/add/${id_formation}` , data,this.httpOptions);
  }
  getAllThemes(): Observable<DataResponseObject<Theme>> {
    return this.http.get<DataResponseObject<Theme>>(API_URL +'/',this.httpOptions);
  }
 
}
