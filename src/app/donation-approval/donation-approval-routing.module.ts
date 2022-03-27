import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationApprovalPage } from './donation-approval.page';

const routes: Routes = [
  {
    path: '',
    component: DonationApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationApprovalPageRoutingModule {}
