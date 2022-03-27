import { Component, OnInit } from '@angular/core';
import { Donation } from '../shared/donation';
import { DonationService } from '../shared/donation.service';

@Component({
  selector: 'app-donation-approval',
  templateUrl: './donation-approval.page.html',
  styleUrls: ['./donation-approval.page.scss'],
})
export class DonationApprovalPage implements OnInit {
  donations: Donation[];
  donation: Donation;
  NewUsed = '';

  constructor(private donationService: DonationService) {
    this.donationService.getPendingDonations()
      .subscribe(data => {
        this.donations = data;
      })
  }

  filter(event){
    const filtered = event.target.value;
    if (filtered == 'New') {
      this.donationService.getNewDonations()
        .subscribe(data => {
          this.donations = data;
        })
    }
    else {
      this.donationService.getUsedDonations()
      .subscribe(data => {
        this.donations = data;
      })
    }
  }

  statusUpdate(donation: Donation, status: string){
    this.donationService.updateStatus(donation, status);
  }

  ngOnInit() {
  }

}
