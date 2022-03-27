import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationRequestListPageRoutingModule } from './donation-request-list-routing.module';

import { DonationRequestListPage } from './donation-request-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationRequestListPageRoutingModule
  ],
  declarations: [DonationRequestListPage]
})
export class DonationRequestListPageModule {}
