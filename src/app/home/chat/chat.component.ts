import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { FormControl } from '@angular/forms';
import {  ElementRef, AfterViewChecked} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable,  of } from 'rxjs';
import {Messaggio } from 'src/app/model/messaggio';
import { Users } from 'src/app/model/users';
import { environment } from 'src/environments/environment.prod';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  id:string=this.activatedRouter.snapshot.params["id"];
  url = 'http://localhost:8089';
  currentUser: any;
  otherUser?: any;
  thisUser: Users = JSON.parse(localStorage.getItem('auth-user')!);
  channelName?: string;
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  base_picture=environment.base_picture;
  newMessage = new FormControl('');
  photo:any;
  photto:any;
  messages?: Observable<Array<Messaggio>>;
  constructor(   private activatedRouter: ActivatedRoute,
    private http:HttpClient,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private el: ElementRef,
    private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getUser(this.id).subscribe((res) => {
        this.otherUser = res.data;
        console.log("sarrrrrrrrrra",this.otherUser);
        this.photto=this.base_picture+ this.otherUser?.photo
        this.photo=this.base_picture+ this.thisUser?.photo
//this.otherUser.propic = "data:image/jpeg;base64,"+ this.otherUser.propic;
        this.connectToChat();
        console.log(this.el)
        this.el.nativeElement.querySelector("#chat").scrollIntoView();
      });
  }
  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown(){
    var container = this.el.nativeElement.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }

  connectToChat() {
    const id1 = this.thisUser.id!;
    const nick1 = this.thisUser.username;
 
    const id2 = this.otherUser?.id!;
    const nick2 = this.otherUser?.username!;

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }
    this.loadChat();
    console.log('connecting to chat...');
    this.socket = new SockJS(this.url + '/chat');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      //func = what to do when connection is established
      console.log('connected to: ' + frame);
      this.stompClient!.subscribe(
        '/topic/messages/' + this.channelName,
        (response) => {
          //func = what to do when client receives data (messages)
          this.loadChat();
        }
      );
    });
  }
  sendMsg() {
    if (this.newMessage.value !== '') {
      this.stompClient!.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify({
          sender: this.thisUser.username,
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    }
  }
  loadChat(){
    this.messages = this.http.post<Array<Messaggio>>(this.url+'/getMessages' ,  this.channelName);
    this.messages.subscribe(data => {
      let mgs:Array<Messaggio> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id) ? 1 : -1)
      this.messages = of(mgs);
    })
    console.log(this.messages);
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }

}
