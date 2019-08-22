import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { error, promise } from 'protractor';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router) { }
  login(email, password) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
