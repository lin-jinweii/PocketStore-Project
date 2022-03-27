import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isUser = false;
  isManager = false;

  constructor(private authService: AuthService) {
    this.authService.observeAuthState(user => {
      this.authService.getUserRole(user.email)
        .subscribe(data =>{
          let role = data;
          if (role == "user"){
            this.isUser = true;
            this.isManager = false;
          }
          else {
            this.isUser = false;
            this.isManager = true;
          }
        }
      )
    })
  }

}
