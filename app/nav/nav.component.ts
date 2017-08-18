import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.username;
    this.authService.usernameChanges.subscribe((usernameNew: string) => {
      this.username = usernameNew;
    });
  }

  logout() {
    this.authService.logout();
  }
}
