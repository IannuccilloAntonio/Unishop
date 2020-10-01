import { UserService } from './../service/user/user.service';
import { Info, User } from './../service/user/user.model';
import { BookService } from './../service/book/book.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController, NavController } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Router } from '@angular/router';
import { Books } from '../service/book/book.model';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {

  photo: any;
  convertedImage: string;
  showphoto: string;
  insertedPhoto: boolean;

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
      picture: 'https://images-na.ssl-images-amazon.com/images/I/51Vx3D+Iu4L._SX354_BO1,204,203,200_.jpg',
      condition: '',
      price: 0
    }
  };

  constructor(
    private actionSheetController: ActionSheetController,
    public camera: Camera,
    private base64: Base64,
    private crop: Crop,
    private toast: ToastController,
    private router: Router,
    private bookService: BookService,
    private storage: Storage,
    private userService: UserService,
    private navCrtl: NavController
  ) { }

  ngOnInit() { }

  async addPhoto() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: ' Scatta una foto',
        icon: 'camera-outline',
        handler: () => {
          this.getPhoto();
        }
      }, {
        text: ' Apri la libreria',
        icon: 'images-outline',
        handler: () => {
          this.upload();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.insertedPhoto = false;
          this.showphoto = null;
        }
      }]
    });
    await actionSheet.present();
  }

  public upload(): void {
    const cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100,
      targetWidth: 212,
      targetHeight: 312,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions)
      .then(
        fileURI => {
          this.showphoto = 'data:image/jpeg;base64,' + fileURI;
          this.insertedPhoto = true;
          return this.crop.crop(fileURI, { quality: 100, targetWidth: -1, targetHeight: -1 });
        },
        err => console.log(err));

  }

  getPhoto() {
    const cameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100,
      targetWidth: 212,
      targetHeight: 312,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions)
      // tslint:disable-next-line: variable-name
      .then(
        fileURI => {
          this.showphoto = 'data:image/jpeg;base64,' + fileURI;
          return this.crop.crop(fileURI, { quality: 100, targetWidth: -1, targetHeight: -1 });
        },
        err => console.log(err));

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

  addBook() {
    this.storage.get('token').then(
      data => {
        const token = data;
        this.userService.getProfile(token).subscribe(
          (res: User) => {
            this.book.result.seller.name = res.user.name;
            this.book.result.seller.surname = res.user.surname;
            this.book.result.seller.email = res.user.email;
            this.book.result.seller.phone = res.user.phone;
            this.book.result.seller.department = res.user.department;
            this.book.result.seller.matriculation = res.user.matriculation;
            this.book.result.picture = this.showphoto;
            const idUser = res.user._id;

            this.bookService.addBook(this.book, token, idUser).subscribe(
              (res2: Info) => {

                if (res2.code === 0) {
                  this.notification('Libro inserito con successo!');
                  this.router.navigate(['./home-page']);
                } else {
                  this.notification('Controlla di aver inserito in modo corretto i dati');
                }
              });
          });
      });
  }

  goBack() {
    this.navCrtl.pop();
  }
}
