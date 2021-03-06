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
import { HomePage, LogoutPopoverPage } from '../pages/home/home';
import { ThreadPage, MorePopoverPage } from '../pages/thread/thread'
import { NewConvPage } from '../pages/new-conv/new-conv'

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ThreadPage,
        NewConvPage,
        LogoutPopoverPage,
        MorePopoverPage
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
        ThreadPage,
        NewConvPage,
        LogoutPopoverPage,
        MorePopoverPage
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
