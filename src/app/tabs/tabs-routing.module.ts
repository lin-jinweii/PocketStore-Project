import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'new-loan',
        loadChildren: () => import('../new-loan/new-loan.module').then(m => m.NewLoanPageModule)
      },
      {
        path: 'loans',
        loadChildren: () => import('../loans/loans.module').then(m => m.LoansPageModule)
      },
      {
        path: 'manage',
        loadChildren: () => import('../manage/manage.module').then(m => m.ManagePageModule)
      },
      {
        path: 'donation-request-list',
        loadChildren: () => import('../donation-request-list/donation-request-list.module').then(m => m.DonationRequestListPageModule)
      },
      {
        path: 'loan-extension',
        loadChildren: () => import('../loan-extension/loan-extension.module').then(m => m.LoanExtensionPageModule)
      },
      {
        path: 'donation-approval',
        loadChildren: () => import('../donation-approval/donation-approval.module').then(m => m.DonationApprovalPageModule)
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
