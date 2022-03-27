import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  loanid: string;
  loan: Loan;
  
  constructor(private route: ActivatedRoute, private router: Router, private loanService: LoanService, private toastController: ToastController) {

    //Get loanid
    this.loanid = this.route.snapshot.params.id;

    // Get loan using loanid
    const today = new Date(Date.now());
    this.loan = new Loan('', '', today, 0, '', '');
    this.loanService.getLoanById(this.loanid)
      .subscribe(data => {
        this.loan = data;
      })
  }

  //Delete loan
  delete(item: Loan) {
    this.loanService.deletePendingLoan(item);
    this.router.navigate(['/tabs/loans']);
  }
  
}
