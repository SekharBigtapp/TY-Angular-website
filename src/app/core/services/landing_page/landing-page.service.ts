import { Injectable } from '@angular/core';
import { BaseHttp } from '../baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService extends BaseHttp {

  getInTouchAddUrl = "CMSPage/getInTouch?operation=add"

  countryListUrl = "register/getAll?operation=country"


  donationTypeUrl = "yogaPayement/typesDonation"

  indianDonationPaymentUrl = "yogaPayement/process-payment"

  indianDonationPayment(body: any) {
    return this.login(this.indianDonationPaymentUrl, body)
  }

  donationType() {
    return this.getRole(this.donationTypeUrl)
  }


  countryList() {
    return this.getRole(this.countryListUrl)
  }

  getInTouchAdd(body: any) {
    return this.login(this.getInTouchAddUrl, body)
  }
}
