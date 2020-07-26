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
                category: RecipeCategory.Entree,
                image: '/assets/img/1.jpg'
            },
            {
                id: 2,
                title: 'Spaghetti',
                category: RecipeCategory.Entree,
                image: '/assets/img/2.jpg'
            },
            {
                id: 3,
                title: 'Korean Salad',
                category: RecipeCategory.Side,
                image: '/assets/img/3.jpg'
            },
            {
                id: 4,
                title: 'Pastry',
                category: RecipeCategory.Dessert,
                image: '/assets/img/4.jpg'
            },
            {
                id: 5,
                title: 'Margherita Pizza',
                category: RecipeCategory.Entree,
                image: '/assets/img/5.jpg'
            },
            {
                id: 6,
                title: 'Korean Salad',
                category: RecipeCategory.Side,
                image: '/assets/img/3.jpg'
            },
            {
                id: 7,
                title: 'Pastry',
                category: RecipeCategory.Dessert,
                image: '/assets/img/4.jpg'
            },
            {
                id: 8,
                title: 'Margherita Pizza',
                category: RecipeCategory.Entree,
                image: '/assets/img/5.jpg'
            }

        ];

        return { recipes };
    }


}
