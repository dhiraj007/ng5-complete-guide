import {Actions, Effect} from '@ngrx/effects';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import {Recipe} from '../recipe.model';

@Injectable()
export class RecipeEffects{

  @Effect()
  recipeFetch = this.action$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(switchMap((action : RecipeActions.FetchRecipes)=>{
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-592db.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      })
    }), map(
      (recipes) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type : RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    ));

  @Effect({dispatch:false})
  recipeStore = this.action$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(withLatestFrom(this.store.select('recipes')), switchMap(([action, state])=>{
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-592db.firebaseio.com/recipes.json',
        state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    }));

  constructor(private action$ : Actions,
              private httpClient : HttpClient, private store : Store<fromRecipe.FeatureState>){}
}
