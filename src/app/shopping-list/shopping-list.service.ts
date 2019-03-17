import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
    ingridientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return [...this.ingredients];
    }

    getIngridient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingridient: Ingredient) {
        this.ingredients.push(ingridient);
        this.ingridientsChanged.next([...this.ingredients]);
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingridientsChanged.next([...this.ingredients]);
    }

    updateIngridient(index: number, newIngridient: Ingredient){
        this.ingredients[index] = newIngridient;
        this.ingridientsChanged.next([...this.ingredients]);
    }

    deleteIngridient(index: number){
        this.ingredients.splice(index, 1);
        this.ingridientsChanged.next([...this.ingredients]);
    }
}