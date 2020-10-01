import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://02141de03e5d.ngrok.io/users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  registration(
    name: string, surname: string, email: string,
    matriculation: number, phone: number, username: string, password: string, department: string) {
    const body = {
      name,
      surname,
      email,
      matriculation,
      department,
      phone,
      username,
      password
    };

    return this.http.post(this.url + 'registration', JSON.stringify(body), this.httpOptions);
  }

  login(username: string, password: string) {
    const body = {
      username,
      password
    };

    return this.http.post(this.url + 'login', JSON.stringify(body), this.httpOptions);
  }

  getProfile(token: any) {
    const body = {
      token
    };

    return this.http.post(this.url + 'profile', JSON.stringify(body), this.httpOptions);
  }
}

