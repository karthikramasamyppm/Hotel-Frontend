import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errorOccurred: string; // TODO: get error form response
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

  }

  submit() {
    this.authService.signIn(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  checkValid(element: string): boolean {
    return !this.loginForm.get(element).valid && this.loginForm.get(element).touched;
  }
}
