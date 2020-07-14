import { Component } from '@angular/core';
import { Subject, EMPTY } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'recipe-clipper';
  loading = true;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.authService.loggedIn;
  }


  constructor(private authService: AuthService,
              private router: Router) {

  }

  userName$ = this.authService.userProfile$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );


  logIn(): void {
    this.authService.login();
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
  }
}
