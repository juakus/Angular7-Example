import { DataService } from './../shared/data.service';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe(
        //     'Lasagna',
        //     'blah',
        //     'https://images.media-allrecipes.com/userphotos/720x405/3359675.jpg',
        //     [
        //         new Ingredient('Pasta', 10),
        //         new Ingredient('Meat', 5)
        //     ]
        // ),
        // new Recipe(
        //     'Rusty Chicken Thighs',
        //     'Gorgeous way to grill chicken',
        //     'https://dish-environment-prod-contentbucket-10u8bszryovz3.s3.amazonaws.com/assets/s3fs-public/styles/content_image_x_large/public/1353642-Rusty-Chicken-Thighs-Photo-by-KGora-resize.png',
        //     [
        //         new Ingredient('Chicken', 3),
        //         new Ingredient('French Fries', 20)
        //     ]
        // )
    ];

    constructor(private slService: ShoppingListService) { }

    setStoredRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next([...this.recipes]);
    }

    getRecipes() {
        return [...this.recipes];
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next([...this.recipes]);
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next([...this.recipes]);
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next([...this.recipes]);
    }
}