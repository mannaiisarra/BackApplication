import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz  } from 'src/app/model/quiz';
import {  HttpHeaders} from '@angular/common/http';
const API_URL = 'http://localhost:8055/quiz';
const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  token:string=localStorage.getItem(TOKEN_KEY);
httpOptions = {
  headers:new HttpHeaders({
    'Authorization':`Bearer `+this.token
  })
};
  constructor(private http: HttpClient) { }


  addQuiz(data: any,etape_id_etape:any,formation:any): Observable<DataResponseObject<Quiz>> {
    return this.http.post<DataResponseObject<Quiz>>(API_URL +`/add/${etape_id_etape}/${formation}`, data,this.httpOptions);
  }


  getAllQuiz(): Observable<DataResponseObject<Quiz>> {
    return this.http.get<DataResponseObject<Quiz>>(API_URL +'/',this.httpOptions);
  }
  addQuizz(data: any): Observable<DataResponseObject<Quiz>> {
    return this.http.post<DataResponseObject<Quiz>>(API_URL +`/addd`, data,this.httpOptions);
  }

  getquizById(id:any): Observable<DataResponseObject<Quiz>> {
    return this.http.get<DataResponseObject<Quiz>>(API_URL +`/getQuiz/` +id,this.httpOptions);
  } 
  removeCours(id: string): Observable<DataResponseObject<Quiz>> {
    return this.http.delete<DataResponseObject<Quiz>>(API_URL + '/deleteQuiz/' + id,this.httpOptions);
  }

  updateCours(id: string, data: any): Observable<DataResponseObject<Quiz>> {
    return this.http.put<DataResponseObject<Quiz>>(API_URL +'/updateQuiz/'+ id, data,this.httpOptions);
  }

  getquizByFormation(id:any): Observable<DataResponseObject<Quiz>> {
    return this.http.get<DataResponseObject<Quiz>>(API_URL +`/getAllEtapeByFormation/` +id,this.httpOptions);
  } 
}
