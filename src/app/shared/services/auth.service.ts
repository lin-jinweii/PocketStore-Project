import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  constructor() { }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  observeAuthState(func) {
    return firebase.auth().onAuthStateChanged(func);
  }

  getUserRole(email: string): Observable<any>{
    return new Observable((observer) => {
      firebase.firestore().collection('users').doc(email).get().then(doc => {
        let role = doc.data().role
        observer.next(role);
        });
      }
    )
  }

  getEmail(){
    return this.email;
  }
  
}
