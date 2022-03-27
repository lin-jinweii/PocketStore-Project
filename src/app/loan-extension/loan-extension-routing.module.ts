import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanExtensionPage } from './loan-extension.page';

const routes: Routes = [
  {
    path: '',
    component: LoanExtensionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanExtensionPageRoutingModule {}
