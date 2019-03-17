import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signinForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.signinForm = new FormGroup({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSignin() {
        const signupInfo = this.signinForm.value;
        this.authService.signin(signupInfo.email, signupInfo.password);
     }

}
