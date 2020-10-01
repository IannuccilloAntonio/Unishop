import { Book, Books } from './book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'https://02141de03e5d.ngrok.io/books/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
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
      picture: '',
      condition: '',
      price: 0
    }
  };

  constructor(
    private http: HttpClient
  ) { }

  search(typeOfQuery: string, filter: string, query: string, token: string) {
    const body = {
      query,
      token,
      typeOfQuery,
      filter
    };

    return this.http.post(this.url + 'search', JSON.stringify(body), this.httpOptions);
  }

  getOneBook(id: string, token: string) {
    const body = {
      id,
      token
    };

    return this.http.post(this.url + 'detailBook', JSON.stringify(body), this.httpOptions);
  }

  addBook(book: Books, token: string, idUser: any) {
    const body = {
      token,
      book,
      idUser
    };

    return this.http.post(this.url + 'newBook', JSON.stringify(body), this.httpOptions);

  }

  edit(book: any, token: string, idBook: any) {
    const body = {
      book,
      token,
      idBook
    };

    return this.http.post(this.url + 'editBook', JSON.stringify(body), this.httpOptions);

  }

  remove(token: string, idBook: any, idUser: any) {
    const body = {
      token,
      idBook,
      idUser
    };

    return this.http.post(this.url + 'deleteBook', JSON.stringify(body), this.httpOptions);

  }

  getAllBook(token: string) {
    const body = {
      token,
    };

    return this.http.post(this.url + 'getAllBook', JSON.stringify(body), this.httpOptions);
  }


}
