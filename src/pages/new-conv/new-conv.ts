import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

	public selected_contacts: any;
	public contacts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  selectContact(contact: any) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewConvPage');
  }

}
