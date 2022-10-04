import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation  } from 'src/app/model/formation';
import { Demande  } from 'src/app/model/demande';
import { HttpClient, HttpHeaders} from '@angular/common/http';
const API_URL = 'http://localhost:8055/formation';


const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class FormationService {


  token:string=localStorage.getItem(TOKEN_KEY);
httpOptions = {
  headers:new HttpHeaders({
    'Authorization':`Bearer `+this.token
  })
};


// token:string=localStorage.getItem('token');
// token ="Bearer" + token
// let HttpHeaders = new HttpHeaders({"Authorization": token})
  constructor(private http: HttpClient) { }

  getAll(): Observable<DataResponseObject<Formation>> {
   return this.http.get<DataResponseObject<Formation>>(API_URL +`/`);
 }

 getAllArchive(): Observable<DataResponseObject<Formation>> {
  return this.http.get<DataResponseObject<Formation>>(API_URL +`/archive`);
}

 addFormation(data: any): Observable<DataResponseObject<Formation>> {
   return this.http.post<DataResponseObject<Formation>>(API_URL + '/add', data);
 }
 removeFormation(id: string): Observable<DataResponseObject<Formation>> {
   return this.http.delete<DataResponseObject<Formation>>(API_URL + '/deleteFormation/' + id);
 }

 removeFR(id: string): Observable<DataResponseObject<Formation>> {
  return this.http.delete<DataResponseObject<Formation>>(API_URL + '/delete/' + id);
}

 getFormationbyId(id:any): Observable<DataResponseObject<Formation>> {
   return this.http.get<DataResponseObject<Formation>>(API_URL+'/findById/'+id);
 }
 updateformation(id: string, data: any): Observable<DataResponseObject<Formation>> {
   return this.http.put<DataResponseObject<Formation>>(API_URL +'/updateFormation/'+ id, data);
 }
 addUserToFormation(users_id:any,data: any): Observable<DataResponseObject<Formation>> {
  return this.http.post<DataResponseObject<Formation>>(API_URL +`/add/${users_id}`, data);
}

getAllDemadeByFormationn(id:any): Observable<DataResponseObject<Demande>> {
  return this.http.get<DataResponseObject<Demande>>(API_URL +`/all/${id}`);
} 
getAllDemande(): Observable<DataResponseObject<Demande>> {
  return this.http.get<DataResponseObject<Demande>>(API_URL +'/');
}
FormationActive(data: any): Observable<DataResponseObject<Formation>> {
  return this.http.post<DataResponseObject<Formation>>(API_URL + '/active', data);
}
FormationNotActive(data: any): Observable<DataResponseObject<Formation>> {
  return this.http.post<DataResponseObject<Formation>>(API_URL + '/Notactive', data);
}

}