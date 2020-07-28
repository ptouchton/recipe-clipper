import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { fadeAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [fadeAnimation]
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
