import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';

@Component({
  selector: 'app-loan-extension',
  templateUrl: './loan-extension.page.html',
  styleUrls: ['./loan-extension.page.scss'],
})
export class LoanExtensionPage {
  loans: Loan[];
  items: Item[];
  loan: Loan;

  constructor(private loanService: LoanService, private itemService: ItemService) { 
    this.loanService.getPendingExtensionLoans()
      .subscribe(data => {
        this.loans = data;
      })
  }

  statusUpdate(loan: Loan, status: string){
    this.loanService.updatePendingExtensionLoans(loan, status);
  }

}
