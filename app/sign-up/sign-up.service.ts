import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { baseUrl } from '../globals';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignUpService {
  constructor (private http: Http) {}

  onUserExist(username: string): Observable<boolean> {
    const search: URLSearchParams = new URLSearchParams();
    search.set('username', username);
    return this.http.get(`${baseUrl}/hotelmanage/validate/`, {search})
      .map((response: Response) => response.json()['user']);
  }
}
