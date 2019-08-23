import { Message } from './../models/message';
import { Chat } from './../shared/interfaces/chat';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private angularFireStore: AngularFirestore) { }
  public getChatRooms(): Observable<Chat[]> {
    return this.angularFireStore.collection('chatRooms').snapshotChanges()
      .pipe(map(chats => chats.map(chat => {
        const c = (chat.payload.doc.data() as Chat);
        c.id = chat.payload.doc.id;
        return c;
      })));
  }
  public getChatRoom(chatId: string): Observable<Chat> {
    return this.angularFireStore.collection('chatRooms').doc(chatId).valueChanges()
      .pipe(
        map(room => {
            const chat = (room as Chat);
            chat.id = chatId;
            return chat;
        })
      );
  }
}
