import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { FormControl } from '@angular/forms';
import { ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Messaggio } from 'src/app/model/messaggio';
import { Users } from 'src/app/model/users';
import { environment } from 'src/environments/environment.prod';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ChatService } from 'src/app/_services/chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chatt',
  templateUrl: './chatt.component.html',
  styleUrls: ['./chatt.component.css'],
})
export class ChattComponent implements OnInit {
  id: string = this.activatedRouter.snapshot.params['id'];
  url = 'http://localhost:8055';
  currentUser: any;
  otherUser?: any;
  thisUser: Users = JSON.parse(localStorage.getItem('auth-user')!);
  channelName?: string;
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  base_picture = environment.base_picture;
  newMessage = new FormControl('');
  photo: any;
  isSubmit=false;
  photto: any;
  photoo: any;
  chatting: any;
  resp: any;
  user: any;
  chattt!: FormGroup;
  chatsq: any;
  UserByother: any;
  term: string = '';
  messages?: Observable<Array<Messaggio>>;
  constructor(
    private activatedRouter: ActivatedRoute,
    private http: HttpClient,
    private route: ActivatedRoute,

    private token: TokenStorageService,
    private chat: ChatService,
    private el: ElementRef,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.chattt = this.fb.group({
      photo: [''],
    });
    this.search();
    this.currentUser = this.token.getUser();

    this.photoo = this.base_picture + this.currentUser?.photo;
    console.log('dddd', this.photoo);

    this.findbyid();
    this.findmessageByChat();
  }

  getUser(id: any) {
    this.userService.getUser(id).subscribe((res) => {
      this.otherUser = res.data;
     
      console.log('sarrrrrrrrrra', this.otherUser);
      this.photto = this.base_picture + this.otherUser?.photo;

      // this.photo=this.base_picture+ this.otherUser?.photo

      //this.otherUser.propic = "data:image/jpeg;base64,"+ this.otherUser.propic;
      this.connectToChat();

      console.log(this.el);
      this.el.nativeElement.querySelector('#chat').scrollIntoView();
    });
  }

  getUserByother(other: any) {
    this.userService.getUserByNickname(other).subscribe((res) => {
      console.log('Get user by other  ', res.data);
      this.isSubmit=true;
      this.photto = this.base_picture + this.otherUser?.photo;
      this.otherUser = res.data;

      this.connectToChat();

      console.log(this.el);
      this.el.nativeElement.querySelector('#chat').scrollIntoView();
    });
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown() {
    var container = this.el.nativeElement.querySelector('#chat');
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

    this.chat.finddChatByName(this.channelName).subscribe((res) => {
      console.log('find chatffffffffffffff  ', res.data);
    });
  }
  sendMsg() {
    if (this.newMessage.value !== '') {
      this.stompClient!.send(
        `/app/chat/${this.channelName}`,
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
  loadChat() {
    this.messages = this.http.post<Array<Messaggio>>(
      this.url +
        `/getMessages/${this.currentUser.username}/${this.otherUser.username}`,
      this.channelName
    );
    this.messages.subscribe((data) => {
      let mgs: Array<Messaggio> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id ? 1 : -1));
      this.messages = of(mgs);
    });
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

  search(): void {
    //const formdata = new FormData();
    //formdata.append("email", this.formEmail.get('email')!.value);

    this.userService.getAll().subscribe((res) => {
      console.log('ddddddddddddddddddddddddddddddddza', res.data);
      this.user = res.data;

      this.user = this.user.filter((item) => {
        return item.roles[0].name !== 'SUPADMIN';
      });
    });
  }

  findbyid() {
    this.chat.finddChatById(this.currentUser.id).subscribe((res) => {
      this.chatsq = res.data;
      console.log('sarra', this.chatsq);

      this.chatsq.forEach((element) => {
        console.log('other is ', element.other);

        // this.user = this.user.filter( item=>{
        //   console.log("filtre condition ",item.id !== element.users.id);
        //   return item.id !== element.users.id  ;
        //    }
        //    )

        //   this.userService.getUser(element.other).subscribe(res=>{
        //     console.log("Get user by other  ",res.data);

        // this.UserByother=res.data

        // })

        this.chat.findMesageBychat(element.chat_id).subscribe((res) => {
          this.UserByother = res.data;
          console.log('Find Message by Chat', this.UserByother);
        });
      });
    });
  }

  findmessageByChat() {
    //const formdata = new FormData();
    //formdata.append("email", this.formEmail.get('email')!.value);

    this.chat.findMesageBychat(this.chatsq.chat_id).subscribe((res) => {
      console.log('Find Message by Chat', res.data);
    });
  }
}
