import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Loan } from '../shared/loan';
import { LoanService } from '../shared/loan.service';

@Component({
  selector: 'app-loan-extension-form',
  templateUrl: './loan-extension-form.page.html',
  styleUrls: ['./loan-extension-form.page.scss'],
})
export class LoanExtensionFormPage implements OnInit {

  loanextensionForm: FormGroup;
  submitted: boolean = false;
  loanid: string;
  loan: Loan;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({positiveNumber: true});
    } 
    else {
      return (null);
    }
  }

  constructor(private route: ActivatedRoute, private loanService: LoanService, private router: Router, private toastController: ToastController) {

    this.loanid = this.route.snapshot.params.id;

    // Get loan using loanid
    const today = new Date(Date.now());
    this.loan = new Loan('', '', today, 0, '', '');
    this.loanService.getLoanById(this.loanid)
      .subscribe(data => {
        this.loan = data;
    })

    this.loanextensionForm = new FormGroup({
      days: new FormControl(0, [LoanExtensionFormPage.positiveNumber]),
      reason: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit() {
  }

  extendLoan() {
    this.submitted = true;
    if (this.loanextensionForm.valid){
      const loan = new Loan(
        this.loan.username,
        "pending-extension",
        this.loan.duedate,
        this.loanextensionForm.value.days,
        this.loanextensionForm.value.reason,
        this.loanid,
      );
      this.loanService.extendApprovedLoans(loan);
      this.router.navigate(['/tabs/loans']);
    }
  }

}
