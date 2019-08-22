import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }
  onSubmitLogin() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigate(['/home']);
    }
    ).catch(err => {
      this.messageService.error(err);
    });
  }
}
