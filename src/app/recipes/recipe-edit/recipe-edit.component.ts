import { RecipeService } from './../recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private recipeService: RecipeService) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.editMode = !!params['id'];
            this.initForm();
        });
    }

    private initForm() {
        let recipeName = '',
            recipeDescription = '',
            recipeImagePath = '',
            recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);

            recipeName = recipe.name;
            recipeDescription = recipe.description;
            recipeImagePath = recipe.imagePath;

            if (recipe['ingredients']) {
                recipe['ingredients'].forEach(x => {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(x.name, Validators.required),
                            'amount': new FormControl(x.amount, [
                                Validators.required, 
                                Validators.pattern(/^[1-9]+[0-9]*$/)
                            ])
                        })
                    )
                })
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'ingredients': recipeIngredients
        });
    }

    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onNewIngredient(){
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required, 
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        )
    }

    onDeleteIngredient(index: number){
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onSubmit() {
        if (this.editMode){
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}
