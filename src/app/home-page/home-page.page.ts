import { UserService } from './../service/user/user.service';
import { BookService } from './../service/book/book.service';
import { Books, Example, Book } from './../service/book/book.model';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { User } from '../service/user/user.model';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  // dati statici
  username: string;

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

  user: User = {
    code: 0,
    status: '',
    user:
    {
      _id: '',
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


  showFilter: boolean;
  showDetail: boolean;
  showCondition: boolean;
  showPrice: boolean;
  showLanguage: boolean;

  typeOfFilters = '';
  query = '';
  numberOfFilter = 0;
  filter: string;

  public department = [
    { val: 'Informatica', isChecked: true },
    { val: 'Biologia', isChecked: false },
    { val: 'Sicurezza dei sistemi software', isChecked: false }
  ];

  public condition = [
    { val: 'Buono', isChecked: true },
    { val: 'In ottime condizioni', isChecked: false },
    { val: 'Usato, con alcune pagine mancanti', isChecked: false },
    { val: 'Leggermente usurato', isChecked: false }
  ];

  public price = [
    { val: 10, isChecked: true },
    { val: 20, isChecked: false },
    { val: 35, isChecked: false }
  ];

  public language = [
    { val: 'Italiano', isChecked: true },
    { val: 'Inglese', isChecked: false }
  ];

  newBooks: Books[] = [];
  constructor(
    private router: Router,
    private storage: Storage,
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.storage.get('username').then(
      (data) => {
        this.username = data;
        console.log(data);
      }
    );
    this.getAllBook();
    this.router.navigate(['./home-page']);
  }

  detailPage(id: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.router.navigate(['./detail-book'], navigationExtras);
  }

  newBook() {
    this.router.navigate(['./add-book']);
  }

  getProfile() {
    this.storage.get('token').then(
      (data) => {
        const token = data;
        console.log(token);
        this.userService.getProfile(token).subscribe(
          (res: User) => {
            this.user = res;
            console.log(res);

          });
      });
  }

  profile() {
    this.router.navigate(['./personal-profile']);
  }

  filters() { this.showFilter = true; }
  filtered() {
    this.showFilter = false;
    this.getSearch();

  }
  close() {
    this.showFilter = false;
    if (this.filter === '') {
      this.getAllBook();
    }
    this.typeOfFilters = '';
  }

  detail(val) {
    this.showDetail = true;
    this.numberOfFilter = 1;
    this.filter = val;
    this.typeOfFilters = 'seller.department';
  }

  closeDetail() {
    this.showDetail = false;
    this.numberOfFilter = 0;

  }

  Condition(val) {
    this.numberOfFilter = 1;
    this.filter = val;
    this.typeOfFilters = 'condition';
    this.showCondition = true;
  }

  closeCondition() {
    this.numberOfFilter = 0;
    this.showCondition = false;
  }

  Price(val) {
    this.numberOfFilter = 1;
    this.filter = val;
    this.typeOfFilters = 'price';
    this.showPrice = true;
  }
  closePrice() {
    this.numberOfFilter = 0;
    this.showPrice = false;
  }

  Language(val) {
    this.numberOfFilter = 1;
    this.filter = val;
    this.typeOfFilters = 'language';
    this.showLanguage = true;
  }

  closeLanguage() {
    this.numberOfFilter = 0;
    this.showLanguage = false;
  }

  search(ev) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.getSearch();
    }
    this.query = val;
  }

  getAllBook() {
    this.storage.get('token').then(
      (data) => {
        const token = data;
        this.bookService.getAllBook(token).subscribe(
          (res: Book) => {
            this.book = res;
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < res.result.length; index++) {
              this.book.result = res.result;
              console.log(this.book);
            }
          });
      });
  }

  getSearch() {
    this.storage.get('token').then(
      (data) => {
        const token = data;
        this.bookService.search(this.typeOfFilters, this.filter, this.query, token).subscribe(
          (res: Book) => {
            this.book = res;
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < res.result.length; index++) {
              this.book.result = res.result;
            }
          });
      });
  }
}
