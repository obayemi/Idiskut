import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the ThreadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-thread',
    templateUrl: 'thread.html',
})
export class ThreadPage {
    private thread: any

    public messages$: Observable<any>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afs: AngularFirestore,
    ) {
        this.thread = this.navParams.get('thread');
        this.messages$ = this.afs.collection(this.thread.ref.collection('messages').path).valueChanges()
        console.log(this.messages$)
        console.log(this.thread)
        console.log(this.thread.ref.collection('messages').path)
    }

    getTitle() {
        return this.thread.data().name;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ThreadPage');
    }

}
