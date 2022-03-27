import { Injectable } from '@angular/core';
import { Item } from './item';
import { Loan } from './loan';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  email: string;

  constructor(private authService: AuthService) {
    this.authService.observeAuthState(user => {
      this.email = user.email;
    })
  }

  //Create Loan
  createLoan(items: Item[]) {
    // Due date is 2 weeks after today 
    let duedate = new Date(); // Today
    duedate.setHours(0, 0, 0, 0); // Midnight
    duedate.setDate(duedate.getDate() + 14); // 2 weeks later

    let days = 0;
    let reason = '';

    // TODO: Get username logged in
    let loan = new Loan(this.email, 'pending', duedate, days, reason);

    // Add to collection '/loans/<autoID>' 
    return firebase.firestore().collection('loans').add({
      username: loan.username,
      status: loan.status,
      duedate: loan.duedate,
      days: loan.days,
      reason: loan.reason,
    }).then(doc => {
      loan.id = doc.id;
      // Add to collection '/loans/<autoID>/items/'
      for (let item of items) {
        if (item.quantity > 0) {
          // Add a new document '/loans/<autoID>/items/<itemID>'
          firebase.firestore().collection('loans/' + doc.id + '/items/').doc(item.id).set({
            quantity: item.quantity
          });
        }
      }
      return loan;
    })
  }

  //Get All Loans
  getAllLoans(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/loans'
      firebase.firestore().collection("loans").where("username", "==", this.email).orderBy("duedate", "asc").onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add loan into array if there's no error
          try {
            let loan = new Loan(doc.data().username, doc.data().status, doc.data().duedate.toDate(), doc.data().days, doc.data().reason, doc.id);
            array.push(loan);

            // Read subcollection '/loans/<autoID>/items'
            let dbItems = firebase.firestore().collection('loans/' + doc.id + '/items');
            dbItems.onSnapshot(itemsCollection => {
              loan.items = []; // Empty array
              itemsCollection.forEach(itemDoc => {
                let item = new Item(itemDoc.id, itemDoc.data().quantity);
                loan.items.push(item);
              });
            });
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  //Get Loan by ID
  getLoanById(id: string): Observable<any>  {
    return new Observable((observer) => {
      // Read document '/loans/<id>'
      firebase.firestore().collection('loans').doc(id).get().then(doc => {
        let loan = new Loan(doc.data().username, doc.data().status, doc.data().duedate.toDate(), doc.data().days, doc.data().reason, doc.id);

        // Read subcollection '/loans/<id>/items'
        firebase.firestore().collection('loans/' + id + '/items').get().then(collection => {
          loan.items = []; // Empty array
          collection.forEach(doc => {
            let item = new Item(doc.id, doc.data().quantity);
            loan.items.push(item);
          })
          observer.next(loan);
        });
      });
    })
  }

  //Get Pending Loans
  getPendingLoans(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/loans'
      firebase.firestore().collection('loans').where('status', '==', 'pending').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add loan into array if there's no error
          try {
            let loan = new Loan(doc.data().username, doc.data().status, doc.data().duedate.toDate(), doc.data().days, doc.data().reason, doc.id);
            array.push(loan);

            // Read subcollection '/loans/<autoID>/items'
            let dbItems = firebase.firestore().collection('loans/' + doc.id + '/items');
            dbItems.onSnapshot(itemsCollection => {
              loan.items = []; // Empty array
              itemsCollection.forEach(itemDoc => {
                let item = new Item(itemDoc.id, itemDoc.data().quantity);
                loan.items.push(item);
              });
            });
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  //Delete Pending Loan
  deletePendingLoan(p: Loan){
    const ref = firebase.firestore().collection('loans').doc(p.id);
    ref.get().then(doc => {
      if (doc.exists)
        ref.delete();
    });
  }

  //Update Pending Loan
  updatePendingLoans(p: Loan, status: string) {
    const ref = firebase.firestore().collection('loans').doc(p.id);
    if (status === "approved") {
      ref.update({
        status: "approved",
      });
    }
    else {
      ref.update({
        status: "rejected",
      });
    }
  }

  extendApprovedLoans(p: Loan) {
    const ref = firebase.firestore().collection('loans').doc(p.id);
    ref.update({
      status: p.status,
      days: p.days,
      reason: p.reason,
    })
  }

  //Get Pending Extension Loans
  getPendingExtensionLoans(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/loans'
      firebase.firestore().collection('loans').where('status', '==', 'pending-extension').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {

          // Add loan into array if there's no error
          try {
            let loan = new Loan(doc.data().username, doc.data().status, doc.data().duedate.toDate(), doc.data().days, doc.data().reason, doc.id);
            array.push(loan);

            // Read subcollection '/loans/<autoID>/items'
            let dbItems = firebase.firestore().collection('loans/' + doc.id + '/items');
            dbItems.onSnapshot(itemsCollection => {
              loan.items = []; // Empty array
              itemsCollection.forEach(itemDoc => {
                let item = new Item(itemDoc.id, itemDoc.data().quantity);
                loan.items.push(item);
              });
            });
          } catch (error) { }

        });
        observer.next(array);
      });
    });
  }

  updatePendingExtensionLoans(p: Loan, status: string) {
    const ref = firebase.firestore().collection('loans').doc(p.id);
    let extendedDate = p.duedate; // Today
    extendedDate.setHours(0, 0, 0, 0); // Midnight
    extendedDate.setDate(extendedDate.getDate() + p.days);
    if (status === "approved") {
      ref.update({
        status: "extended",
        duedate: extendedDate,
      });
    }
    else {
      ref.update({
        status: "not extended",
      });
    }
  }
}
