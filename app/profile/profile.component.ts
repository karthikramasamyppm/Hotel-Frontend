import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

class User {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  creditCard: string;
  username: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  reservations: object[] = [];
  profileForm: FormGroup;
  user = new User();
  success;

  constructor(private profileService: ProfileService, private router: Router) {}

  getRes() {
    this.profileService.getReservations().subscribe((response: any) => {
      this.reservations = response.reservation;
      this.user.firstName = response.profile.first_name;
      this.user.lastName = response.profile.last_name;
      this.user.address = response.profile.address;
      this.user.phone = response.profile.phone;
      this.user.creditCard = response.profile.credit_card;
      Object.keys(this.user)
        .filter((key) => key !== 'username' && this.user[key] !== 'None')
        .forEach((key) => this.profileForm.get(key).patchValue(this.user[key]));
    });
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('([\\d\\(][\\(\\)\\s\\.\\-\\d]{7,}\\d)')
      ]),
      address: new FormControl(null, Validators.required),
      creditCard: new FormControl(null, [Validators.required, Validators.pattern('\\d{12}')])
    });
    this.getRes();
    this.user.username = this.profileService.getUser();
    this.profileService.userChagnes().subscribe((newUsername) => {
      this.user.username = newUsername;
      if (!newUsername) {
        this.router.navigate(['/']);
      }
    });
  }

  editProfile() {
    this.profileService.onEditProfile(this.profileForm.value).subscribe(
      () => this.success = true,
      () => this.success = false);
    this.getRes();
  }

  checkValid(element: string): boolean {
    return !this.profileForm.get(element).valid && this.profileForm.get(element).touched;
  }
}
