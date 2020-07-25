import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { EMPTY, Subject, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  responseJson: object;
  
  constructor(public auth: AuthService,
              private http: HttpClient) {}

  userName$ = this.auth.userProfile$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  pingApi(): void {
    this.http.get(environment.productsApi).subscribe(
      res => this.responseJson = res
    );
  }
}
