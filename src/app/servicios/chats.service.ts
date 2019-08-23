import { Message } from 'src/app/models/message';
import { Chat } from './../shared/interfaces/chat';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  usernameFilter: BehaviorSubject<string>;

  constructor(private angularFireStore: AngularFirestore) {
  }
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
  public sendMessageTo(message: Message, chatId: string) {
    this.angularFireStore.collection('chatRooms').doc(chatId).update({
      messages: firestore.FieldValue.arrayUnion(message)
    });
  }
  public doExistsUsername(username: string) {
    this.usernameFilter = new BehaviorSubject(username);
    return this.usernameFilter.pipe(
      switchMap(user =>
        this.angularFireStore.collection<Chat>('chatRooms',
            ref =>
            ref.where('name', '==', user)
          ).valueChanges())
    );
  }
}
