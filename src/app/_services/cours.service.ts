import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cours  } from 'src/app/model/cours';
import { HttpClient, HttpHeaders} from '@angular/common/http';
const API_URL = 'http://localhost:8055/cours';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class CoursService {
  token:string=localStorage.getItem(TOKEN_KEY);
httpOptions = {
  headers:new HttpHeaders({
    'Authorization':`Bearer `+this.token
  })
};
  constructor(private http: HttpClient) { }


  addCours(data: any): Observable<DataResponseObject<Cours>> {
    return this.http.post<DataResponseObject<Cours>>(API_URL +`/add`, data,this.httpOptions);
  }


  addCoursByEtape(data: any,etape_id_etape:any): Observable<DataResponseObject<Cours>> {
    return this.http.post<DataResponseObject<Cours>>(API_URL + `/addd/${etape_id_etape}` , data,this.httpOptions);
  }

  getAllCoursByEtape(etape_id_etape:any): Observable<DataResponseObject<Cours>> {
    return this.http.get<DataResponseObject<Cours>>(API_URL +`/findCours/${etape_id_etape}`,this.httpOptions);
  } 


  removeCours(id: string): Observable<DataResponseObject<Cours>> {
    return this.http.delete<DataResponseObject<Cours>>(API_URL + '/deleteCours/' + id,this.httpOptions);
  }

  updateCours(id: string, data: any): Observable<DataResponseObject<Cours>> {
    return this.http.put<DataResponseObject<Cours>>(API_URL +'/updateCours/'+ id, data,this.httpOptions);
  }
  getUserByDemande(id:any): Observable<DataResponseObject<Cours>> {
    return this.http.get<DataResponseObject<Cours>>(API_URL+'/findById/'+id,this.httpOptions);
  }
  

}
