import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Donation } from '../shared/donation';
import { DonationService } from '../shared/donation.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../shared/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-donation-request',
  templateUrl: './donation-request.page.html',
  styleUrls: ['./donation-request.page.scss'],
})

export class DonationRequestPage implements OnInit {
  donationrequestForm: FormGroup;
  photo: SafeResourceUrl;
  email: string;
  submitted: boolean = false;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({positiveNumber: true});
    } 
    else {
      return (null);
    }
  }

  constructor(private router: Router, private donationService: DonationService, private sanitizer: DomSanitizer, private authService: AuthService, private toastController: ToastController) { 
    this.donationrequestForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quality: new FormControl('', [Validators.required]),
      damages: new FormControl(''),
      available: new FormControl(0, [DonationRequestPage.positiveNumber])
    });
    this.authService.observeAuthState(user => {
      this.email = user.email;
    })
  }

  ngOnInit() {
  }

  async takePhoto(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  add() {
    this.submitted = true;
    if (this.donationrequestForm.valid){
      const donations = new Donation(
        this.donationrequestForm.value.name,
        this.donationrequestForm.value.quality,
        this.donationrequestForm.value.damages,
        this.donationrequestForm.value.available,
        this.photo,
        "Pending Approval",
        this.email,
      );
      this.donationService.add(donations);
      this.router.navigate(['/tabs/donation-request-list']);
    }
  }

}
