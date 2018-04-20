import { EventEmitter } from '@angular/core';

import { Ingredients} from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientChanged = new EventEmitter<Ingredients[]>();

    private ingredients : Ingredients[] = [
        new Ingredients('Apples',5),
        new Ingredients('Tomatos',5),
        new Ingredients('Milk',100)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(ingredient : Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    addNewIngredients(ingredients : Ingredients[]){
        this.ingredients.push(...ingredients); //spread operator converts array into list of arguments
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}