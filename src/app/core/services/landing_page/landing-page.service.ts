import { Injectable } from '@angular/core';
import { BaseHttp } from '../baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService extends BaseHttp {

  getInTouchAddUrl = "CMSPage/getInTouch?operation=add"

  countryListUrl = "yogaAdmin/register/getAll?operation=country"


  countryList() {
    return this.getRole(this.countryListUrl)
  }

  getInTouchAdd(body: any) {
    return this.login(this.getInTouchAddUrl, body)
  }
}
