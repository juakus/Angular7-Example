import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router){

    }

    signup(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => {
                    console.log(error);
                }
            )
    }

    signin(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(resp => {
                this.router.navigate(['/']);
                console.log(resp);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
            })
            .catch(error => {
                console.log(error);
            })
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );

        return this.token;
    }

    isAuthenticated(){
        return !!this.token;
    }
}