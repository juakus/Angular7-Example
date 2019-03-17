import { AuthService } from './../../auth/auth.service';
import { DataService } from './../../shared/data.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(private data: DataService, public authService: AuthService){}

    saveData(){
        this.data.storeRecipes()
            .subscribe(
                (resp) => {
                    console.log(resp);
                }
            );
    }

    getData(){
        this.data.getStoredRecipes();
    }

    onLogout(){
        this.authService.logout();
    }

    isAuthenticated(){
        return this.authService.isAuthenticated();
    }
}