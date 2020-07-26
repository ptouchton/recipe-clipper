import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  favoriteRecipes$ = this.recipesSvc.favoriteRecipes$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );


  constructor(private recipesSvc: RecipesService) { }

  ngOnInit(): void {
  }


}
