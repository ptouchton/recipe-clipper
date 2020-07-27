import { Pipe, PipeTransform } from '@angular/core';
import { RecipeCategory } from '../enums/recipe-category';

@Pipe({
  name: 'recipeCategoryDisplay'
})
export class RecipeCategoryDisplayPipe implements PipeTransform {

  transform(value: RecipeCategory, ...args: unknown[]): unknown {

    if (value === null) {
      return null;
    }

    return RecipeCategory[value];

  }

}
