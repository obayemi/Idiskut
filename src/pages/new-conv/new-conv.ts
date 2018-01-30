import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

/**
 * Generated class for the NewConvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-new-conv',
    templateUrl: 'new-conv.html',
})
export class NewConvPage {

    public searchUser: FormControl;
    public user: any;
    public users: Array<any> = [];
    public search_result$: Observable<Array<any>>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afs: AngularFirestore,
    ) {
        this.user = this.navParams.get('user');
        this.searchUser = new FormControl();
        this.initSearch()
    }

    initSearch() {
        this.search_result$ = this.searchUser.valueChanges.switchMap(
            search => {
                return this.afs .collection(
                    'users',
                    ref => {
                        return ref
                            .where('displayName', '>=', search)
                            .orderBy('displayName')
                    }
                ).snapshotChanges()
            })
            .map(threads_snap => threads_snap.map(
                t => t.payload.doc
            ).filter(a => a.data().displayName == this.user.displayName)
            )
    }

    selectContact(contact: any) {
        this.users.push(contact)
        this.initSearch()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewConvPage');
    }

}
