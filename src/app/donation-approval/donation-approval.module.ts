import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationApprovalPageRoutingModule } from './donation-approval-routing.module';

import { DonationApprovalPage } from './donation-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationApprovalPageRoutingModule
  ],
  declarations: [DonationApprovalPage]
})
export class DonationApprovalPageModule {}
