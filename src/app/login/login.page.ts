import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { Info } from '../service/user/user.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  constructor(
    private router: Router,
    private storage: Storage,
    private userService: UserService,
    private toast: ToastController
  ) { }

  ngOnInit() {
  }

  homePage() {
    this.userService.login(this.username, this.password).subscribe(
      (res: Info) => {
        if (res.code === 0) {
          this.notification(res.status, 'primary');
          this.storage.set('token', res.token);
          this.router.navigate(['./home-page']);
        }

        else {
          this.notification(res.status, 'danger');
        }
      });
  }

  registration() {
    this.router.navigate(['./registration']);
  }

  async notification(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      position: 'top',
      color,
      duration: 2000
    });

    toast.present();
  }
}
