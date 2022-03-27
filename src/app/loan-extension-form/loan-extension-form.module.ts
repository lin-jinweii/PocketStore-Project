import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanExtensionFormPageRoutingModule } from './loan-extension-form-routing.module';

import { LoanExtensionFormPage } from './loan-extension-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoanExtensionFormPageRoutingModule
  ],
  declarations: [LoanExtensionFormPage]
})
export class LoanExtensionFormPageModule {}
