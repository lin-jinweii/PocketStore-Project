import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanExtensionFormPage } from './loan-extension-form.page';

const routes: Routes = [
  {
    path: '',
    component: LoanExtensionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanExtensionFormPageRoutingModule {}
