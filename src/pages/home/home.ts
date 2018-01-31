import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { AngularFirestore } from 'angularfire2/firestore';
import { PopoverController, ViewController } from 'ionic-angular';

import { ThreadPage } from '../thread/thread'
import { NewConvPage } from '../new-conv/new-conv'


@Component({
  template: `
        <ion-list>
          <button ion-item color="danger" (click)="logout()">Log out</button>
        </ion-list>
      `
})
export class LogoutPopoverPage {
    constructor(
        public authModule: AuthServiceProvider,
        public viewCtrl: ViewController,
    ) {}

    logout() {
        this.authModule.signOut()
        this.close()
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private threads_col: any;
    public threadPage: ThreadPage

    public user$: Observable<User>;
    public user: User;
    public threads$: Observable<any>;

    constructor(
        public navCtrl: NavController,
        private afs: AngularFirestore,
        public authModule: AuthServiceProvider,
        private popoverCtrl: PopoverController,
    ) {
        this.user$ = this.authModule.authUser
        this.user$.subscribe(user => this.user = user)
        this.threads_col = this.afs.collection('threads')
        this.threads$ = this.user$.switchMap(user =>
            this.threads_col
            .snapshotChanges()
            .map(threads_snap => threads_snap
                .map(t => t.payload.doc)
                .filter(t => {
                    console.log(t.data())
                    console.log(user)
                    return user && t.data().users.some(
                        a => {
                            console.log(a)
                            console.log(this.afs.firestore.collection('users').doc(user.uid))
                            return true
                            //return a == this.afs.firestore.collection('users').doc(user.uid)
                        }
                    )
                })
            )
        )
    }


    presentPopover(event) {
        let popover = this.popoverCtrl.create(LogoutPopoverPage);

        popover.present({
            'ev': event
        });
    }


    threadSelected(thread) {
        this.navCtrl.push(ThreadPage, {
            'thread': thread,
            'user': this.user
        })
    }

    newConversation() {
        this.navCtrl.push(NewConvPage, {
            'user': this.user,
        })
    }

    ionViewCanEnter() {
        // TODO: guard against unauth views
        return true;
        //return this.authService.authenticated();
    }
}
