import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DetailService } from './detail.service';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/Rx';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  hotelId: number;
  hotel: object = {};
  roomsList: object[];
  reserveForm: FormGroup;
  searchForm: FormGroup;
  error: string;
  searchError: string;
  reserveResponse: string;
  reservedDays: object = {'reservations': null};
  numbers = Array.from(Array(6).keys()).map(i => i + 1);

  constructor(private router: ActivatedRoute,
              private detailService: DetailService,
              private authService: AuthService) {}

  ngOnInit() {
    this.hotelId = this.router.snapshot.params['id'];
    this.detailService.getHotel(this.hotelId).subscribe((response) => {
      this.hotel = response.json();
    });
    this.reserveForm = new FormGroup({
      'date_from': new FormControl(null, Validators.required),
      'date_to': new FormControl(null, Validators.required),
      'room_id': new FormControl(null)
    });

    this.searchForm = new FormGroup({
      'date_from': new FormControl(null, Validators.required),
      'date_to' : new FormControl(null, Validators.required),
      'room_quality': new FormControl(null, Validators.required)
    });

    this.error = this.authService.isAuth() ? null : 'Please login to reserve';
  }

  getRoom(id: number) {
    this.reserveForm.patchValue({'room_id': id});
  }

  reset() {
    this.reserveForm.reset();
    this.reservedDays = {'reservations': null};
    if (this.authService.token) {
      this.error = null;
    }
  }

  reserve() {
    if (this.authService.token) {
      this.detailService.reserveRoom(this.hotelId, this.reserveForm.value).subscribe((response) => {
        this.reserveResponse = response.error || 'Reserved succesfull';
      }, () => {
        this.error = 'Something went wrong';
      });
    }
  }

  search() {
    this.detailService.searchRoom(this.hotelId, this.searchForm.value)
      .subscribe((response) => {
      this.searchError = response.error ? response.error : null;
      this.roomsList = response.error ? null : response;
      }, (response) => {
        this.searchError = response[0];
      });
  }

  showReservations(roomId: number) {
    this.detailService.getReservations(roomId).subscribe((response) => {
      this.reservedDays = response;
    });
  }
}
