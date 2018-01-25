import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environment';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomPage } from '../pages/room/room';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RoomPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RoomPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthServiceProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GooglePlus,
    ]
})
export class AppModule {}
