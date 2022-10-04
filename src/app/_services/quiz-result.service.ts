import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DataResponseObject } from './../model/DataResponseObject';
import { QuizResultResponse  } from 'src/app/model/quizresultresponse';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8055/ResultQuiz';
const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  token:string=localStorage.getItem(TOKEN_KEY);
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
  constructor(private http: HttpClient) { }


  getResult(): Observable<DataResponseObject<QuizResultResponse>> {
    return this.http.get<DataResponseObject<QuizResultResponse>>(API_URL+'/',this.httpOptions);
  }  
  getresultByquiz(quiz_id:any): Observable<DataResponseObject<QuizResultResponse>> {
    return this.http.get<DataResponseObject<QuizResultResponse>>(API_URL +`/getAllresultByQuiz/` +quiz_id,this.httpOptions);
  } 
}
