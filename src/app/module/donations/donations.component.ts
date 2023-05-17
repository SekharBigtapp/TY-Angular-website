import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/core/services/landing_page/landing-page.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  disabledAgreement: boolean = false;
  constructor(private router: Router, private service: LandingPageService, private formBuilder: FormBuilder) { }

  isShow: boolean = true;
  topPosToStartShowing = 100;
  touchForm!: FormGroup
  indiandonationForm!: FormGroup
  countryList: any = []

  errorMessage: any = undefined
  messageSent: boolean = false
  donationList!: any
  stripePaymentUrl = "https://donate.stripe.com/test_eVa6rnb25cJHgCcaEE"
  indianPaymentErrorMessage: any = undefined
  // @HostListener('window:scroll')



  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
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



  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function (e) {
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });

    this.touchForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      country: [null, Validators.compose([Validators.required])],
      query: [null, Validators.compose([Validators.required])]
    })

    this.indiandonationForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      emailId: [null, Validators.compose([Validators.email, Validators.required])],
      contactNo: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      areYouIndian: [null, Validators.compose([Validators.required])],
      want80gBenefits: [null, Validators.compose([Validators.required])],
      panNumber: [null, Validators.compose([Validators.required])],
      adhaarNumber: [null, Validators.compose([Validators.required])],
      donationTypeId: [null, Validators.compose([Validators.required])],
      message: [null, Validators.compose([Validators.required])],


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

    this.service.donationType().subscribe({
      next: (response: any) => {
        this.donationList = response
      },
      error: (error: any) => {
        console.error(error.message);

      }
    })
  }

  formatCamelCase(value: any) {
    return value && value.charAt(0).toUpperCase() + value.slice(1)
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

    this.service.getInTouchAdd(body).subscribe({
      next: (response: any) => {
        this.touchForm.reset()
        this.messageSent = true
      },
      error: (error) => {
        console.error(error);

      }

    })
  }

  makeIndianPayment() {
    this.indianPaymentErrorMessage = undefined
    if (this.indiandonationForm.invalid)
      return this.indiandonationForm.markAllAsTouched()

    console.log(this.indiandonationForm.value);
    const { name, emailId, address, adhaarNumber, areYouIndian, want80gBenefits, panNumber, donationTypeId, message } = this.indiandonationForm.value
    const body = {
      "name": this.formatCamelCase(name),
      emailId,
      "address": this.formatCamelCase(address),
      adhaarNumber,
      "areYouIndian": this.formatCamelCase(areYouIndian),
      "want80gBenefits": this.formatCamelCase(want80gBenefits),
      panNumber,
      "message": this.formatCamelCase(message),
      "donationTypeId": {
        "typeId": Number(donationTypeId)
      },
      "transactionId": "stripe_transaction_id",
      "amount": Number(1000),
      "status": "Success"
    }

    this.service.indianDonationPayment(body).subscribe({
      next: (response: any) => {
        console.log(response);

      },
      error: (error: any) => {
        console.error(error);
        this.indianPaymentErrorMessage = this.formatCamelCase("Failed to process payment.")


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

}
