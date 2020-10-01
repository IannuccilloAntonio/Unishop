import { Storage } from '@ionic/storage';
import { BookService } from './../service/book/book.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Books } from '../service/book/book.model';


@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  id = '';
  book: Books = {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private emailComposer: EmailComposer,
    private bookService: BookService,
    private navCrtl: NavController,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param) => {
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    );
    this.getBook();
  }

  async onDetailMail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Email',
      message: this.book.result.seller.email,
      buttons: [
        {
          text: 'Invia email',
          handler: (blah) => {
            this.sendEmail();
          }
        }]
    });

    await alert.present();

  }

  async onDetailNumber() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Email',
      message: this.book.result.seller.phone.toString(),
      buttons: [
        {
          text: 'Chiama',
          handler: (blah) => {
            this.call();
          }
        }]
    });

    await alert.present();

  }

  sendEmail() {
    this.emailComposer.open({
      to: this.book.result.seller.email
    });
  }

  call() {

    const telNumber = this.book.result.seller.phone.toString();
    window.open(`tel:${telNumber}`, '_system');
  }

  home() {
    this.navCrtl.pop();
  }

  getBook() {
    this.storage.get('token').then(
      (data) => {
        const token = data;
        this.bookService.getOneBook(this.id, token).subscribe(
          (res: Books) => {
            this.book = res;
          }
        );
      });
  }

}
