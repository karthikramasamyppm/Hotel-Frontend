import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { baseUrl } from './globals';

@Injectable()
export class AuthService {
  usernameChanges = new Subject<string>();
  constructor(private http: Http, private cookie: CookieService) {
  }

  signIn(credentials: { password: string, username: string }): Observable<any> {
    let token;
    return this.http.post(`${baseUrl}/api-token-auth/`, credentials)
      .catch((error: Response) => Observable.throw(`Bad login or password`))
      .map((response: Response) => response.json())
      .map((response) => token = response.token)
      .flatMap(() => this.getUsername(token))
      .map((response) => {
        this.createAuthCookies(token, response.user);
        this.usernameChanges.next(response.user);
        return response;
      });
  }

  getUsername(token: string): Observable<any> {
    const headers = new Headers({AUTHORIZATION: `Token ${token}`});

    return this.http.get(`${baseUrl}/hotelmanage/authenticate/`, {headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  logout() {
    this.cookie.remove('token');
    this.cookie.remove('username');
    this.usernameChanges.next(null);
  }

  isAuth() {
    return !!this.token;
  }

  get token() {
    return this.cookie.get('token');
  }

  get username() {
    return this.cookie.get('username');
  }

  createAuthCookies(token: string, username: string) {
    this.cookie.put('token', token);
    this.cookie.put('username', username);
  }

  createUser(credentials: { password: string, username: string }) {
    return this.http.post(`${baseUrl}/signup/`, credentials)
      .catch((error: Response) => Observable.throw('Cannot register user'))
      .flatMap(() => this.signIn(credentials));
  }
}
