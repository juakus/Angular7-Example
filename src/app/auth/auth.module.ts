import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule{}