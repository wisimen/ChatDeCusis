import { ChatComponent } from './../componentes/chat/chat.component';
import { Chat } from './../shared/interfaces/chat';
import { ChatsService } from '../servicios/chats.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { of, Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chats: Observable<Chat[]> = of([]);
  constructor(
    private authService: AuthService,
    private chatsService: ChatsService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.chats = this.chatsService.getChatRooms();

    //this.chatsService.getChatRooms().subscribe(x => { console.log(x); });
  }

  onLogOut() {
    this.authService.logout();
  }
  onChatClick(chat: Chat) {
    this.modalController.create({
      component: ChatComponent,
      componentProps: {
        chat
      }
    }).then(modal => {
      modal.present();
    });
  }
}
