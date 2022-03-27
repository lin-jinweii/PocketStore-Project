import { Injectable } from '@angular/core';
import { Donation } from './donation';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  email: string;

  constructor(private authService: AuthService) {
    this.authService.observeAuthState(user => {
      this.email = user.email;
    })
  }

  add(p: Donation) {
    firebase.firestore().collection("donations").add({
      name: p.name,
      quality: p.quality,
      damages: p.damages,
      available: p.available,
      status: p.status,
      username: p.username,
    }).then(doc => {
      if (p.image) {
        const dataUrl = p.image.changingThisBreaksApplicationSecurity;
        const imageRef = firebase.storage().ref().child(doc.id);
        imageRef.putString(dataUrl, firebase.storage.StringFormat.DATA_URL).then(() => {
          const ref = firebase.firestore().collection("donations").doc(doc.id);
          ref.update({image: doc.id});
        });
      }
    });
  }

  //Get All Donations
  getAllDonations(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/donations'
      firebase.firestore().collection("donations").onSnapshot(querySnapshot => {
        let donations = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Donation(data.name, data.quality, data.damages, data.available, data.image, data.status, data.username, doc.id);

          if (data.image) {
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          donations.push(p);
          });

        observer.next(donations);
      });
    });
  }

  getDonationByID(id: string): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection("donations").doc(id).get().then((doc) => {
        let data = doc.data();
        let p = new Donation(data.name, data.quality, data.damages, data.available, data.image, data.status, data.username, doc.id);
        // If there's image, read from Firebase Storage
        if (data.image) {
          p.imagePath = data.image;
          const imageRef = firebase.storage().ref().child(data.image);
          imageRef.getDownloadURL()
            .then(url => {
            p.image = url;
            // Tell the subscriber that image is updated
            observer.next(p);
            console.log('Image is ' + p.image);
          }).catch(error => {
            console.log('Error: Read image fail ' + error);
          });
        }
        observer.next(p);
      });
    });
  }

  getPendingDonations(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/donations'
      firebase.firestore().collection("donations").where("status", "==", "Pending Approval").onSnapshot(querySnapshot => {
        let donations = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Donation(data.name, data.quality, data.damages, data.available, data.image, data.status, data.username, doc.id);

          if (data.image) {
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          donations.push(p);
          });

        observer.next(donations);
      });
    });
  }

  getUsedDonations(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/donations'
      firebase.firestore().collection("donations").where("quality", "==", "Used").where("status", "==", "Pending Approval").onSnapshot(querySnapshot => {
        let donations = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Donation(data.name, data.quality, data.damages, data.available, data.image, data.status, data.username, doc.id);

          if (data.image) {
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          donations.push(p);
          });

        observer.next(donations);
      });
    });
  }

  getNewDonations(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/donations'
      firebase.firestore().collection("donations").where("quality", "==", "New").where("status", "==", "Pending Approval").onSnapshot(querySnapshot => {
        let donations = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let p = new Donation(data.name, data.quality, data.damages, data.available, data.image, data.status, data.username, doc.id);

          if (data.image) {
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);
            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          donations.push(p);
          });

        observer.next(donations);
      });
    });
  }

  deleteDonation(p: Donation) {
    const ref = firebase.firestore().collection("donations").doc(p.id);
    ref.get().then(doc => {
      if (doc.exists)
        ref.delete();
    });
  }

  updateStatus(p: Donation, status: string){
    const ref = firebase.firestore().collection("donations").doc(p.id);
    if (status === "Approved") {
      ref.update({
        status: "Approved",
      })
    }
    else {
      ref.update({
        status: "Rejected",
      })
    }
  }
}
