import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService extends BaseHttp {
  // paymentUrl = "http://127.0.0.1:8080/donation/create-payment-intent";
  paymentUrl = "/yogaPayement/donation/create-payment-intent";
  donationTypeUrl = "yogaPayement/donation/typesDonation"

  paymentIntent(body: any) {
    return this.donation(this.paymentUrl, body);
  }

  donationType() {
    return this.getRole(this.donationTypeUrl)
  }
}
