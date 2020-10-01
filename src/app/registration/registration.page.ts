import { UserService } from './../service/user/user.service';
import { Info } from './../service/user/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  name: string;
  surname: string;
  email: string;
  matriculation: number;
  phone: number;
  username: string;
  password: string;
  department: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private toast: ToastController
  ) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['./home-page']);
  }

  registration() {
    this.userService.registration(this.name,
      this.surname,
      this.email,
      this.matriculation,
      this.phone,
      this.username,
      this.password,
      this.department).subscribe(
        (res: Info) => {
          if (res.code === 0) {
            this.notification(res.status);
            this.goLogin();
          }
          if (res.code === -2) {
            this.notification(res.status);
          }
        });
    }

  async notification(message: string) {
    const toast = await this.toast.create({
      message,
      position: 'top',
      color: 'light',
      duration: 2000
    });

    toast.present();
  }

  goLogin(){
    this.router.navigate(['./login']);
  }
}
