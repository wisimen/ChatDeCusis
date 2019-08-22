import { error } from 'protractor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  error(msj) {
    console.log(msj);
  }
}
