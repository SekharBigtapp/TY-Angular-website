import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/core/services/landing_page/landing-page.service';
import { environment } from 'src/environments/environment.prod';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-vedic-neutraceuticles',
  templateUrl: './vedic-neutraceuticles.component.html',
  styleUrls: ['./vedic-neutraceuticles.component.css']
})
export class VedicNeutraceuticlesComponent implements OnInit {
  disabledAgreement: boolean = false;
  constructor(private router: Router, private service: LandingPageService, private formBuilder: FormBuilder) { }

  isShow: boolean = true;
  topPosToStartShowing = 300;
  windowScrolled: boolean | undefined;
  isloading: boolean = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }



  touchForm!: FormGroup
  countryList: any = []

  errorMessage: any = undefined
  messageSent: boolean = false

  // Adding captchaElement
  @ViewChild('captchaElem', { static: false }) captchaElem!: ReCaptcha2Component;
  // getting site key from environment.prod
  recaptchaSiteKey = environment.recaptchaSiteKey



  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function (e) {
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });

    this.touchForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{7,12}$/)])],
      country: [null, Validators.compose([Validators.required])],
      query: [null, Validators.compose([])],
      recaptcha: [null, Validators.compose([Validators.required])]

    })
    this.getCountryDetails()
  }
  getCountryDetails() {
    this.service.countryList().subscribe({
      next: (response: any) => {
        this.countryList = response
      },
      error: (error: any) => {
        console.error(error);

      }
    })
  }

  formatCamelCase(value: any) {
    return value && value.charAt(0).toUpperCase() + value.slice(1)
  }
  changefield() {
    this.messageSent = false
  }
  // Function triggers when reCaptcha suceesss
  recaptchahandleSuccess(event: any) {
  }

  // Function Reload the captcha
  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  // Function reset the captcha
  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  submitTouch() {
    this.errorMessage = undefined;
    this.messageSent = false
    const { name, country, query, phoneNumber, email } = this.touchForm.value

    if (this.touchForm.invalid) {
      // this.errorMessage = "Form is invalid"
      console.log(this.errorMessage);
      return this.touchForm.markAllAsTouched()
    }
    const body =

    {
      "name": this.formatCamelCase(name),
      "emailId": email,
      "mobileNumber": "+" + this.countryList.filter((ele: any) => ele.countryId == country)[0].dialCode + "-" + phoneNumber,
      "country": {
        "countryId": Number(country)
      },
      "query": this.formatCamelCase(query)
    }
    this.isloading = true

    this.service.getInTouchAdd(body).subscribe({
      next: (response: any) => {
        this.touchForm.reset()
        this.messageSent = true
        this.isloading = false
        this.disabledAgreement = false
        this.reload()
      },
      error: (error) => {
        this.isloading = false

        console.error(error);

      }

    })
  }
  isCheckboxenabled(event: any) {
    console.log(event);
    let isChecked = event.target.checked;
    if (isChecked == false) {
      this.disabledAgreement = false;
    } else {
      this.disabledAgreement = true;
    }
  }


  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      console.log(scrollPosition)
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
