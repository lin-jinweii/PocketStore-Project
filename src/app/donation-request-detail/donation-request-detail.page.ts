import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Donation } from '../shared/donation';
import { DonationService } from '../shared/donation.service';

@Component({
  selector: 'app-donation-request-detail',
  templateUrl: './donation-request-detail.page.html',
  styleUrls: ['./donation-request-detail.page.scss'],
})
export class DonationRequestDetailPage{
  donationid: string;
  donation: Donation;

  constructor(private route: ActivatedRoute, private donationService: DonationService) {

    this.donationid = this.route.snapshot.params.id;
    this.donation = new Donation('', '', '', 0, '', '', '');
    this.donationService.getDonationByID(this.donationid)
      .subscribe(data => {
        this.donation = data;
      })
  }


}
