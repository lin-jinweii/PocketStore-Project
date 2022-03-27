import { Component } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';

@Component({
  selector: 'app-manage',
  templateUrl: 'manage.page.html',
  styleUrls: ['manage.page.scss']
})
export class ManagePage {
  loans: Loan[];
  items: Item[];
  loan: Loan;

  constructor(private loanService: LoanService, private itemService: ItemService) { 
    this.loanService.getPendingLoans()
      .subscribe(data => {
        this.loans = data;
      })
  }

  statusUpdate(loan: Loan, status: string){
    this.loanService.updatePendingLoans(loan, status);
  }

}
