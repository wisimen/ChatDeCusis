import { ChatsService } from './../../servicios/chats.service';
import { Message } from './../../models/message';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Chat } from 'src/app/shared/interfaces/chat';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  chat: Chat;
  public messages: Observable<Message[]>;
  room: any;
  public message: Message;
  constructor(private navParams: NavParams, private modalController: ModalController, private chatsService: ChatsService) { }
  ngOnInit() {
    this.chatsService.getChatRoom(this.navParams.get('chat').id).subscribe(c=>{
      this.chat = c;
    });
  }
  onCloseChat() {
    this.modalController.dismiss();
  }
  onSendMessage() {
  }
}
