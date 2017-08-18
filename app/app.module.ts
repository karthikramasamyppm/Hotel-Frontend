import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {RouterModule, Routes} from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MainService} from './main/main.service';
import { HttpModule } from '@angular/http';
import { DetailService } from './detail/detail.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {CookieService} from 'angular2-cookie/core';
import { NavComponent } from './nav/nav.component';
import {ProfileService} from "./profile/profile.service";
import {AuthGuard} from "./auth-guard";
import {SignUpService} from "./sign-up/sign-up.service";
import { FilterPipe } from './main/filter.pipe';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: MainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailComponent,
    SignInComponent,
    ProfileComponent,
    SignUpComponent,
    NavComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MainService,
    DetailService,
    AuthService,
    CookieService,
    ProfileService,
    AuthGuard,
    SignUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
