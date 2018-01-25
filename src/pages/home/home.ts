import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public user$: Observable<User>;

    constructor(
        public navCtrl: NavController,
        //private afs: AngularFirestore,
        public authModule: AuthServiceProvider,
    ) {
        this.user$ = this.authModule.authUser
    }

    ionViewCanEnter() {
        // TODO: guard against unauth views
        return true;
        //return this.authService.authenticated();
    }
}
