import { Chat } from './../shared/interfaces/chat';
import { ChatsService } from '../servicios/chats.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chats: Observable<Chat[]> = of([]);
  constructor(private authService: AuthService, private chatsService: ChatsService) { }

  ngOnInit(): void {
    this.chats = this.chatsService.getChatRooms();

    //this.chatsService.getChatRooms().subscribe(x => { console.log(x); });
  }

  onLogOut() {
    this.authService.logout();
  }
}
