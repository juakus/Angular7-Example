import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    ingridientForm: FormGroup;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.ingridientForm = new FormGroup({
            name: new FormControl('', Validators.required),
            amount: new FormControl(0, [
                Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
        });

        this.subscription = this.shoppingListService.startedEditing
            .subscribe((index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngridient(index);
                this.ingridientForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            });

    }

    onSubmit() {
        const ingName = this.ingridientForm.value.name;
        const ingAmount = this.ingridientForm.value.amount;
        const newIngredient = new Ingredient(ingName, ingAmount);

        if (this.editMode) {
            this.shoppingListService.updateIngridient(this.editedItemIndex, newIngredient);
            
        } else {
            this.shoppingListService.addIngredient(newIngredient);
        }

        this.onClear();
    }

    onClear(){
        this.ingridientForm.reset({amount: 0});
        this.editMode = false;
    }

    onDelete(index: number){
        this.shoppingListService.deleteIngridient(this.editedItemIndex);
        this.onClear();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
