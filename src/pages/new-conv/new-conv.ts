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
    public threadName: FormControl;
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
        this.threadName = new FormControl();
        this.initSearch()
    }

    initSearch() {
        this.searchUser.reset()
        this.search_result$ = this.searchUser.valueChanges.switchMap(
            search => {
                return this.afs .collection(
                    'users',
                    ref => {
                        return ref
                            .where('displayName', '>=', search || '')
                            .orderBy('displayName')
                    }
                ).valueChanges()
            })
            .map(list => list.filter((a: any) => !(
                    a.uid == this.user.uid ||
                    this.users.some(u => a.uid === u.uid)
                ))
            )
    }

    selectContact(contact: any) {
        this.users.push(contact)
        this.initSearch()
    }

    createThread() {
        let error = false
        console.log(this.threadName.value)
        if (this.threadName.value === "") {
            this.threadName.setErrors({
              "notUnique": true
            });
            error = true
        }
        if (this.users.length == 0) { error = true }
        if (error) { return }

        this.afs.firestore.collection('threads').add({
            'name': this.threadName.value,
            'users': this.users.concat([this.user, ]).map(u => this.afs.firestore.collection('users').doc(u.uid))
        }).then(() => this.navCtrl.pop())
    }
}
