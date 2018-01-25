import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
//import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';


/*
 * Auth service provides firebase google auth
 */
@Injectable()
export class AuthServiceProvider {
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        //private fb: Facebook,
        private googlePlus: GooglePlus,
        private platform: Platform,
    ) {
        //console.log('Hello AuthServiceProvider Provider');
        //const usersRef = this.afs.collection('users');
        //const users = usersCollection.valueChanges();
    }

    signInWithGoogle() {
        if (this.platform.is('mobile')) {
            this.googlePlus.login({
                'webClientId': '18136209733-0mi85pb0hp509mehl0nja8l6o45nrcni.apps.googleusercontent.com',
                'offline': true
            }).then(res => {
                var provider = firebase.auth.GoogleAuthProvider.credential(res.idToken);

                firebase.auth().signInWithCredential(provider).then(
                    auth => console.log(auth)
                ).catch(
                    err => console.log(err)
                )
            }).catch(err => console.log('g+err', err))
                .catch(err => console.log(err))
        } else {
            this.afAuth.auth
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(res => {
                    this.updateUserData(res.user)
                });
        }
    }

    //signInWithFacebook() {
        //console.log('omae wa mou tameru')
        //if (this.platform.is('mobile')) {
            //console.log('mobile native auth')
            //return this.fb.login(['email', 'public_profile']).then(res => {
                //const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                //const auth = firebase.auth().signInWithCredential(facebookCredential);
                //auth.then(user => this.updateUserData(user));
                //return auth

            //})
        //} else {
            //console.log('web auth')
            //this.afAuth.auth
                //.signInWithPopup(new firebase.auth.FacebookAuthProvider())
                //.then(res => {
                    //this.updateUserData(res.user)
                //});
        //}
    //}

    signOut() {
        this.afAuth.auth.signOut();
    }

    get authState() {
        return this.afAuth.authState;
    }

    get authUser() {
        return this.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc(`users/${user.uid}`).valueChanges()
                } else {
                    return Observable.of(null);
                }
            })
    }

    authenticated() {
        return this.authUser.map(user => user == null)
    }

    updateUserData(user) {
        console.log(user);
        const userRef: AngularFirestoreDocument<User> =
            this.afs.doc<User>(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
        }
        userRef.set(data);
    }
}
