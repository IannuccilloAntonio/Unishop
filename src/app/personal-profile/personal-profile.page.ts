import { ModalController, ToastController } from '@ionic/angular';
import { Book, Books } from './../service/book/book.model';
import { BookService } from './../service/book/book.service';
import { UserService } from './../service/user/user.service';
import { Storage } from '@ionic/storage';
import { User, Info } from './../service/user/user.model';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.page.html',
  styleUrls: ['./personal-profile.page.scss'],
})
export class PersonalProfilePage implements OnInit {
  modify = false;
  count = 0;
  id: string[] = [];
  show: { [key: number]: boolean } = {};
  user: User = {
    code: 0,
    status: '',
    user:
    {
      _id: 0,
      name: '',
      surname: '',
      email: '',
      department: '',
      matriculation: 0,
      phone: 0,
      username: '',
      book: []
    }
  };

  oneBook: Books = {
    code: 0,
    status: '',
    result: {
      _id: '',
      name: '',
      authorName: '',
      seller:
      {
        name: '',
        surname: '',
        email: '',
        phone: 0,
        department: '',
        matriculation: 0,
      },
      description: {
        numberOfPage: 0,
        isbn: '',
        language: '',
      },
      picture: '',
      condition: '',
      price: 0
    }
  };
  book: Book = {
    code: 0,
    status: '',
    result: [{
      _id: '',
      name: '',
      authorName: '',
      seller:
      {
        name: '',
        surname: '',
        email: '',
        phone: 0,
        department: '',
        matriculation: 0,
      },
      description: {
        numberOfPage: 0,
        isbn: '',
        language: '',
      },
      picture: '',
      condition: '',
      price: 0
    }]
  };

  constructor(
    private router: Router,
    private storage: Storage,
    private userService: UserService,
    private bookService: BookService,
    private toast: ToastController,
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  goHome() {
    this.router.navigate(['./home-page']);
  }
  newBook() {
    this.router.navigate(['./add-book']);
  }

  logout() {
    this.router.navigate(['./login']);
    this.storage.clear();
  }

  getProfile() {
    this.router.navigate(['./personal-profile']);
    this.storage.get('token').then(
      data => {
        const token = data;
        this.userService.getProfile(token).subscribe(
          (res: User) => {
            this.user = res;
            for (let index = 0; index < res.user.book.length; index++) {
              this.bookService.getOneBook(res.user.book[index], token).subscribe(
                (res2: Books) => {
                  this.book.result[index] = res2.result;
                  this.id[index] = res2.result._id;
                });
            }
          });
      });
  }

  edit(i: number) {
    this.show[i] = true;
  }

  apply(i: number, idBook: any) {
    this.storage.get('token').then(
      data => {
        const token = data;
        this.userService.getProfile(token).subscribe(
          (res: User) => {
            this.user = res;
            this.oneBook.result = this.book.result[i];
            this.bookService.edit(this.oneBook, token, idBook).subscribe(
              (res3: Info) => {
                this.notification(res3.status);
                if (res3.code === 0) {
                  this.goHome();
                }
              });
          });
      });
    this.show[i] = false;
  }

  delete(idBook: any) {
    this.storage.get('token').then(
      data => {
        const token = data;
        this.userService.getProfile(token).subscribe(
          (res: User) => {
            this.user = res;
            this.bookService.remove(token, idBook, this.user.user._id).subscribe(
              (res3: Info) => {
                this.notification(res3.status);
                if (res3.code === 0) {
                  this.goHome();
                }
              });
          });
      });
  }

  datailBook(id: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.router.navigate(['./detail-book'], navigationExtras);
    console.log(id);
  }
  close(i: number) {
    this.show[i] = false;
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

}
