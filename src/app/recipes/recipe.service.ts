import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>(); 

    private recipes : Recipe[] = [
        new Recipe(
            'Veg starter',
            'Made up of vegetables and assorted sauses',
            'https://c.pxhere.com/images/86/bd/2cd467b39533f3069607284b5ca6-1418585.jpg!d',
            [
                new Ingredients('Vegetables',3),
                new Ingredients('Sauses',4)
            ]
        ),
        new Recipe(
            'Chicken Starter',
            'Made up f chicken pieces',
            'https://static01.nyt.com/images/2016/02/16/dining/16COOKING-SALMONWITHLEEKS2/16COOKING-SALMONWITHLEEKS2-articleLarge.jpg',
            [
                new Ingredients('Chicken pieces',6),
                new Ingredients('French Fries',2)
            ]
        )
    ];

    constructor(private slService : ShoppingListService){

    }

    getRecipe() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients : Ingredients[]){
        this.slService.addNewIngredients(ingredients);
    }
}