import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { map } from 'rxjs/operators';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';


@Injectable()
export class DataService {
    apiUrl: string = `https://recipe-book-9467c.firebaseio.com/recipes.json`;

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put(this.apiUrl,
            this.recipeService.getRecipes(), { observe: 'body' });
    }

    getStoredRecipes() {
        const token = this.authService.getToken();

        this.http.get<Recipe[]>(
            this.apiUrl,
            {
                observe: 'body',
                responseType: 'json'
            }
        )
            .pipe(
                map(
                    (recipes) => {
                        recipes.map(x => {
                            if (!x['ingredients']) x['ingredients'] = [];
                        })

                        return recipes;
                    }
                )
            )
            .subscribe(
                (resp) => {
                    const recipes: Recipe[] = resp;

                    this.recipeService.setStoredRecipes(recipes);
                }
            );
    }
}