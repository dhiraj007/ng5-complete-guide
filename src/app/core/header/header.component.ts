import {Component, OnInit} from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import {Router} from '@angular/router';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  authState : Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  ngOnInit(){
    this.authState = this.store.select('auth');

  }

  onSaveData() {
    /*this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );*/
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    //this.dataStorageService.getRecipes(); normal way
    //below is the ngrx/store way
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
