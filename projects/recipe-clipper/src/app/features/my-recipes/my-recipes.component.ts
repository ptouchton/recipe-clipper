import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipesService } from 'app/services/recipes.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rcpl-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyRecipesComponent implements OnInit {

  // favoriteRecipes$ =  this.recipesSvc.favoriteRecipes$;
  // http: any;
  responseJson: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(environment.recipesApi).subscribe(
      res => this.responseJson = res
    );
  }

}
