import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationRequestDetailPageRoutingModule } from './donation-request-detail-routing.module';

import { DonationRequestDetailPage } from './donation-request-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationRequestDetailPageRoutingModule
  ],
  declarations: [DonationRequestDetailPage]
})
export class DonationRequestDetailPageModule {}
