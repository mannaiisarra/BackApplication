import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question  } from 'src/app/model/question';
import { Quiz  } from 'src/app/model/quiz';
const API_URL = 'http://localhost:8055/question';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  token:string=localStorage.getItem(TOKEN_KEY);
httpOptions = {
  headers:new HttpHeaders({
    'Authorization':`Bearer `+this.token
  })
};
  constructor(private http: HttpClient) { }


  addQuestion(data: any,quiz_id:any): Observable<DataResponseObject<Question>> {
    return this.http.post<DataResponseObject<Question>>(API_URL +`/addd/${quiz_id}`, data,this.httpOptions);
  }
  getQuestion(id:any): Observable<DataResponseObject<Question>> {
    return this.http.get<DataResponseObject<Question>>(API_URL+'/findallByid/'+id,this.httpOptions);
  }  
  removeQuestion(id: string): Observable<DataResponseObject<Question>> {
    return this.http.delete<DataResponseObject<Question>>(API_URL + '/deleteQuestion/' + id,this.httpOptions);
  }

  getAll(): Observable<DataResponseObject<Question>> {
    return this.http.get<DataResponseObject<Question>>(API_URL +'/',this.httpOptions);
  }


  getQuestionById(id:any): Observable<DataResponseObject<Question>> {
    return this.http.get<DataResponseObject<Question>>(API_URL+'/findById/'+id,this.httpOptions);
  } 

  
  updateQuestion(quesId: string, data: any): Observable<DataResponseObject<Question>> {
    return this.http.put<DataResponseObject<Question>>(API_URL +'/updateQuestion/'+ quesId, data,this.httpOptions);
  }
}
