import { Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../globals';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainService {
  constructor(private http: Http) {}

  getHotels(): Observable<any> {
    return this.http.get(`${baseUrl}/hotelmanage/`)
      .map((response: Response) => response.json());
  }

}
