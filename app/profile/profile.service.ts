import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../auth.service';
import { baseUrl } from '../globals';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProfileService {

  constructor(private http: Http, private authService: AuthService) {}
  getReservations() {
    const headers = new Headers({AUTHORIZATION: `Token ${this.authService.token}`});
    return this.http.get(`${baseUrl}/hotelmanage/profile/`, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  userChagnes (): Subject<string> {
    return this.authService.usernameChanges;
  }

  getUser() {
    return this.authService.username;
  }

  onEditProfile(credentials): Observable<any> {
    const parsedCredentials = {
      'first_name': credentials.firstName,
      'last_name': credentials.lastName,
      'credit_card': credentials.creditCard,
      'phone': credentials.phone,
      'address': credentials.address
    };
    const headers = new Headers({AUTHORIZATION: `Token ${this.authService.token}`});
    return this.http.put(`${baseUrl}/hotelmanage/profile/`, parsedCredentials, {headers: headers});
  }
}
