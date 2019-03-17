import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSignup() { 
        const signupInfo = this.signupForm.value;
        console.log(signupInfo);
        this.authService.signup(signupInfo.email, signupInfo.password);
    }

}
