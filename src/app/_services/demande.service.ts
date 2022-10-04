import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Demande } from 'src/app/model/demande';
import { Formation } from 'src/app/model/formation';
import { HttpClient, HttpHeaders} from '@angular/common/http';
const API_URL = 'http://localhost:8055/demande';
const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  variable:any;


  token:string=localStorage.getItem(TOKEN_KEY);
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
  
  constructor(private http: HttpClient) { }

  removeDemande(id: string): Observable<DataResponseObject<Demande>> {
    return this.http.delete<DataResponseObject<Demande>>(API_URL + '/delateDemande/' + id,this.httpOptions);
  }

  getDemandeById(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL+'/findById/'+id,this.httpOptions);
  }


  addDemande(data: any,formationn_id:any,users_id:any): Observable<DataResponseObject<Demande>> {
    return this.http.post<DataResponseObject<Demande>>(API_URL + `/add/${formationn_id}/${users_id}` , data,this.httpOptions);
  }
  getAllDemande(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +'/',this.httpOptions);
  }
  getformationAjouter(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/all/${id}`,this.httpOptions);
  } 
  
  getActive(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/active/${id}/true`,this.httpOptions);
  }  
  getActiveNot(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/active/${id}/false`,this.httpOptions);
  }  

  getNotActive(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/Notactive/False`,this.httpOptions);
  } 
  getNotActiveWithVueFalse(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/Nottactive/False/False`,this.httpOptions);
  } 
  getDemandetActive(): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/Notactive/True`,this.httpOptions);
  } 

  getUserByDemande(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL+'/findById/'+id,this.httpOptions);
  }
  updatedemandee(id: string, data: any): Observable<DataResponseObject<Demande>> {
    return this.http.put<DataResponseObject<Demande>>(API_URL +`/updateFormation/${id}`, data,this.httpOptions);
  } 
  updateVu(id: string, data: any): Observable<DataResponseObject<Demande>> {
    return this.http.put<DataResponseObject<Demande>>(API_URL +`/VueTrue/${id}`, data,this.httpOptions);
  } 

  getAll(): Observable<DataResponseObject<Formation>> {
    return this.http.get<DataResponseObject<Formation>>(API_URL +`/Allformation`,this.httpOptions);
  }
  AllFormationByUser(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/AllFormation/${id}`);
  }  

  getAllDemandeByUsers(id:any): Observable<DataResponseObject<Demande>> {
    return this.http.get<DataResponseObject<Demande>>(API_URL +`/allDemandeByUsers/${id}`);
  } 

}