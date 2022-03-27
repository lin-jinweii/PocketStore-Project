import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanExtensionPageRoutingModule } from './loan-extension-routing.module';

import { LoanExtensionPage } from './loan-extension.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanExtensionPageRoutingModule
  ],
  declarations: [LoanExtensionPage]
})
export class LoanExtensionPageModule {}
