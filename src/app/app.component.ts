import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  platform: any;
  constructor() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDrI2IgmFzhcnWIA5Kt8x71kymUNRLRREw",
    authDomain: "msaassignment-31763.firebaseapp.com",
    projectId: "msaassignment-31763",
    storageBucket: "msaassignment-31763.appspot.com",
    messagingSenderId: "950335349545",
    appId: "1:950335349545:web:116b551f73e8d983a24d38"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }

  initializeApp(){

    this.platform.ready().then(() => {
      
   
 
});
  }
}
