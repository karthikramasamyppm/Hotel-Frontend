import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  errorOccurred: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private signService: SignUpService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required, this.isUserExist.bind(this)),
      'password': new FormControl(null, Validators.required)
    });
  }

  submit() {
    this.authService.createUser(this.signupForm.value).subscribe(
      () => this.router.navigate(['/']),
      (response) => this.errorOccurred = response);
  }

  checkValid(element: string): boolean {
    return !this.signupForm.get(element).valid && this.signupForm.get(element).touched;
  }

  isUserExist (control: FormControl): Observable<any> {
    return new Observable((observer: Observer<{[key: string]: boolean} | null>) => {
      this.signService.onUserExist(control.value).subscribe((response) => {
        observer.next(response ? {'forbidden': true } : null);
        observer.complete();
      });
    });
  }
}
