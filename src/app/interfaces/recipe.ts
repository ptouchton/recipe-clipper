import { RecipeCategory } from '../enums/recipe-category';
import { Url } from 'url';

export interface Recipe {
    id: number;
    title: string;
    category: RecipeCategory;
    image?: Url;
}
