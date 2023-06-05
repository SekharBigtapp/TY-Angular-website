import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService extends BaseHttp {
  paymentUrl = "/yogaPayement/donation/create-payment-intent";
  donationTypeUrl = "yogaPayement/donation/typesDonation"
  donationUrl = "yogaPayement/donation/donarRecords"

  paymentIntent(body: any) {
    return this.donation(this.paymentUrl, body);
  }

  donationType() {
    return this.getRole(this.donationTypeUrl);
  }

  donate(data: any) {
    return this.postDonate(this.donationUrl, data);
  }

}
