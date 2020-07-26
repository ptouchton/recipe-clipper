import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from '../interfaces/recipe';
import { RecipeCategory } from '../enums/recipe-category';

@Injectable({ providedIn: 'root' })

export class RecipeData implements InMemoryDbService {
    // tslint:disable-next-line: typedef
    createDb() {
        const recipes: Recipe[] = [
            {
                id: 1,
                title: 'Yellow Chicken Curry',
                category: RecipeCategory.Entree
            }
        ];

        return { recipes };
    };


}