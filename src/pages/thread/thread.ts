import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { PopoverController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ThreadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  template: `
        <ion-list>
          <button ion-item color="light" (click)="leave()">Quitter</button>
        </ion-list>
      `
})
export class MorePopoverPage {
    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
    ) {}

    leave() {
        this.navCtrl.pop();
    }

//<button ion-item color="light" (click)="addPeople()">Ajouter</button>
    /*addPeople() {
        this.navCtrl.push()
    }*/

    close() {
        this.viewCtrl.dismiss();
    }
}

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
        private popoverCtrl: PopoverController
    ) {
        this.thread = this.navParams.get('thread');
        this.user = this.navParams.get('user');
        this.messagesRef = this.afs
            .collection(
                this.thread.ref.collection('messages').path,
                ref => ref.orderBy('time', 'desc').limit(50)
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
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(MorePopoverPage);

        popover.present({
            'ev': event
        });
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
