import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: "AIzaSyAE7HKcxoQ9TQ7WyAefDzGpzNB7HGgDNrs",
            authDomain: "recipe-book-9467c.firebaseapp.com"
        });
    }

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
