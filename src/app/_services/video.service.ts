import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Video  } from 'src/app/model/video';
import { HttpClient, HttpHeaders} from '@angular/common/http';
const API_URL = 'http://localhost:8055/video';
const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  token:string=localStorage.getItem(TOKEN_KEY);
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`Bearer `+this.token
    })
  };
  constructor(private http: HttpClient) { }

  addVideoByEtape(data: any,etape_id_etape:any): Observable<DataResponseObject<Video>> {
    return this.http.post<DataResponseObject<Video>>(API_URL + `/add/${etape_id_etape}` , data,this.httpOptions);
  }

  removeVideo(id: string): Observable<DataResponseObject<Video>> {
    return this.http.delete<DataResponseObject<Video>>(API_URL + '/delete/' + id,this.httpOptions);
  }
  findVideoByid(id:any): Observable<DataResponseObject<Video>> {
    return this.http.get<DataResponseObject<Video>>(API_URL+'/findById/'+id,this.httpOptions);
  }
  updateVideo(id: string, data: any): Observable<DataResponseObject<Video>> {
    return this.http.put<DataResponseObject<Video>>(API_URL +'/updatevideo/'+ id, data,this.httpOptions);
  }
  getProgress(): Observable<DataResponseObject<Video>> {
    return this.http.get<DataResponseObject<Video>>(API_URL +`/progress/True`,this.httpOptions);
  } 
}
