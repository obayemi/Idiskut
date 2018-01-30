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

    public searchField: FormControl;
    public user: any;
    public users: Array<any>;
    public search_result$: Observable<Array<any>>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afs: AngularFirestore,
    ) {
        this.user = this.navParams.get('user');
        this.searchField = new FormControl();
        this.searchField.valueChanges.subscribe(a => console.log(a))
        this.afs.collection('users').valueChanges(a => console.log('', a))
        this.afs.collection('users', ref => ref.where('displayName', '>=', 'oba')).valueChanges(a => console.log('oba', a))
        this.afs.collection('users', ref => ref.where('displayName', '>=', 'obayemi Exsequiae')).valueChanges(a => console.log('*', a))
        this.afs.collection('users', ref => ref.where('displayName', '>=', 'iae')).valueChanges(a => console.log('iae', a))
        this.search_result$ = this.searchField.valueChanges.switchMap(
            search => this.afs.collection('users', ref => ref.where('displayName', '>=', search)
            ).snapshotChanges()).map(threads_snap => threads_snap.map(t => t.payload.doc))
    }

    selectContact(contact: any) {
        this.users.push(contact)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewConvPage');
    }

}
