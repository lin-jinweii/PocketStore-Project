import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Donation } from '../shared/donation';
import { DonationService } from '../shared/donation.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-donation-request-list',
  templateUrl: './donation-request-list.page.html',
  styleUrls: ['./donation-request-list.page.scss'],
})
export class DonationRequestListPage {

  donations: Donation[];
  email:string;
  
  constructor(private donationService: DonationService, private authService: AuthService, private alertCtrl: AlertController) {
    this.donationService.getAllDonations()
      .subscribe(data => {
        this.donations = data;
    })
    this.authService.observeAuthState(user => {
      this.email = user.email;
    })
  }

  async deleteDonation(item: Donation) {
    const alert = await this.alertCtrl.create({
      message: 'Are you sure you want to delete donation?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel Delete');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.donationService.deleteDonation(item);
          }
        }
      ]
    });

    await alert.present();
  }

}
