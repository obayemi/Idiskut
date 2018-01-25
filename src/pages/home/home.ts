import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private threads_col: any;

    public user$: Observable<User>;
    public threads$: Observable<any>;

    constructor(
        public navCtrl: NavController,
        private afs: AngularFirestore,
        public authModule: AuthServiceProvider,
    ) {
        this.user$ = this.authModule.authUser
        this.threads_col = this.afs.collection('threads')
        this.threads$ = this.threads_col
            .snapshotChanges()
            .map(threads_snap => threads_snap.map(t => t.payload.doc))
            //.subscribe(')
        //this.threads$.subscribe(a => console.log(a))
    }

    threadSelected(thread) {
        console.log(thread)
    }

    ionViewCanEnter() {
        // TODO: guard against unauth views
        return true;
        //return this.authService.authenticated();
    }
}
