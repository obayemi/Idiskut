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
    private messagesRef: any;
    private user: any;

    public message: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afs: AngularFirestore,
    ) {
        this.thread = this.navParams.get('thread');
        this.user = this.navParams.get('user');
        this.messagesRef = this.afs
            .collection(
                this.thread.ref.collection(
                    'messages'
                    //ref => ref.orderBy('age', 'desc')).path
            )
        this.messages$ = this.messagesRef.valueChanges()
        //.switchmap(
            //message => this.afs.doc(message.author.path).valueChanges().map(
                //user => {
                    //message.author = user
                    //return message
                //}
            //)
        //)
        //console.log(this.messages$)
        //console.log(this.thread)
        //console.log(this.thread.ref.collection('messages').path)
    }

    getUser(userRef) {
        //userRef.valueChanges()
        //console.log(userRef)
        return "a"
        //return this.afs.doc(userRef.path).valueChanges()
    }

    postMessage(message) {
        this.messagesRef.add({
            'text': message,
            'author': this.afs.doc(`users/${this.user.uid}`).ref,
            'time': Date.now(),
        })
    }

    getTitle() {
        return this.thread.data().name;
    }

    onSubmit() {
        this.postMessage(this.message)
        this.message = ""
    }
}
