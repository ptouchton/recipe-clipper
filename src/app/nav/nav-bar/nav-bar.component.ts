import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { EMPTY, Subject, pipe } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(public auth: AuthService) {}

  userName$ = this.auth.userProfile$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
}
