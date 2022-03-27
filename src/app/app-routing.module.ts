import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-items',
    loadChildren: () => import('./add-items/add-items.module').then( m => m.AddItemsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'loan-extension',
    loadChildren: () => import('./loan-extension/loan-extension.module').then( m => m.LoanExtensionPageModule)
  },
  {
    path: 'donation-request',
    loadChildren: () => import('./donation-request/donation-request.module').then( m => m.DonationRequestPageModule)
  },
  {
    path: 'donation-approval',
    loadChildren: () => import('./donation-approval/donation-approval.module').then( m => m.DonationApprovalPageModule)
  },
  {
    path: 'donation-request-detail/:id',
    loadChildren: () => import('./donation-request-detail/donation-request-detail.module').then( m => m.DonationRequestDetailPageModule)
  },
  {
    path: 'loan-extension-form/:id',
    loadChildren: () => import('./loan-extension-form/loan-extension-form.module').then( m => m.LoanExtensionFormPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
