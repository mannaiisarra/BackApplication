
import { Message } from 'src/app/model/message';
import { DataResponseObject } from './../model/DataResponseObject';
import { Injectable } from '@angular/core';
import {Messaggio } from 'src/app/model/messaggio';
import {Chat } from 'src/app/model/chat';
import { Observable } from 'rxjs';
import { Cours  } from 'src/app/model/cours';
import { HttpClient, HttpHeaders} from '@angular/common/http';
const API_URL = 'http://localhost:8055';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


 constructor(private http: HttpClient) {

}
finddChatByName(name:any): Observable<DataResponseObject<Chat>> {
  return this.http.get<DataResponseObject<Chat>>(API_URL +`/findchat/${name}`);
} 
finddChatByNamee(sender:any): Observable<DataResponseObject<Messaggio>> {
  return this.http.get<DataResponseObject<Messaggio>>(API_URL +`/find/${sender}`);
} 
 
finddChatById(users_id:any): Observable<DataResponseObject<Chat>> {
  return this.http.get<DataResponseObject<Chat>>(API_URL +`/findByid/${users_id}`);
} 

findMesageBychat(chat:any): Observable<DataResponseObject<Messaggio>> {
  return this.http.get<DataResponseObject<Messaggio>>(API_URL +`/findChatById/${chat}`);
}
}