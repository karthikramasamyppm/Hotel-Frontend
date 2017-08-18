import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../auth.service';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { baseUrl } from '../globals';

interface ReserveRoom {
  room_id: number;
  date_from: string;
  date_to: string;
}

interface SearchRoom {
  date_from: string;
  date_to: string;
  room_quality: number;
}

@Injectable()
export class DetailService {
  constructor(private http: Http, private authService: AuthService) {}

  getHotel(id: number): Observable<Response> {
    return this.http.get(`${baseUrl}/hotelmanage/${id}/`);
  }

  reserveRoom(hotelId: number, credentials: ReserveRoom): Observable<any> {
    const headers = new Headers({AUTHORIZATION: `Token ${this.authService.token}`});
    return this.http.post(`${baseUrl}/hotelmanage/${hotelId}/reserve/`, credentials, {headers})
      .map((response: Response) => response.json());
  }

  searchRoom(hotelId: number, credentials: SearchRoom): Observable<any> {
    return this.http.post(`${baseUrl}/hotelmanage/searchroom/${hotelId}/`, credentials)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.parse(error['_body']).error));
  }

  getReservations(roomId: number): Observable<any> {
    return this.http.get(`${baseUrl}/hotelmanage/reservations/${roomId}/`)
      .map((response: Response) => response.json());
  }
}
