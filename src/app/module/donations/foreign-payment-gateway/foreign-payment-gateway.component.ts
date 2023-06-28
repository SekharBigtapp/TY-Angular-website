import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../donation.service';

declare var Razorpay: any;

@Component({
  selector: 'app-foreign-payment-gateway',
  templateUrl: './foreign-payment-gateway.component.html',
  styleUrls: ['./foreign-payment-gateway.component.css']
})
export class ForeignPaymentGatewayComponent implements OnInit {

  foreignDonationForm!: FormGroup;
  countryList: any;
  minAmount: any;
  donationList!: any;

  indianPaymentSuccessMessage!: any
  indianPaymentErrorMessage !: any



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private donationService: DonationService
  ) { }

  ngOnInit(): void {
    this.foreignDonationForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      emailId: [null, Validators.compose([Validators.email, Validators.required])],
      // contactNo: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{7,12}$/)])],
      contactNo: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      taxPayer: [null, Validators.compose([])],
      passport: [null, Validators.compose([])],
      photoIdentity: [null, Validators.compose([])],
      donationTypeId: [null, Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.min(0)])],
      message: [null, Validators.compose([Validators.required])],

      // address: [null, Validators.compose([Validators.required])],
      // want80gBenefits: [null, Validators.compose([Validators.required])],
      // panNumber: [null, Validators.compose([])],
      // adhaarNumber: [null, Validators.compose([Validators.minLength(19)])],
    });

    this.getCountry();
    this.donationType();
  }

  getCountry() {
    this.donationService.getCountry().subscribe({
      next: (response: any) => {
        this.countryList = response;
      },
      error: (error: any) => {
        console.error(error.message);
      }
    });
  }

  donationType() {
    this.donationService.donationType().subscribe({
      next: (response: any) => {
        this.donationList = response;
      },
      error: (error: any) => {
        console.error(error.message);
      }
    });
  }

  makeForeignPayment() {
    if (this.foreignDonationForm.invalid)
      return this.foreignDonationForm.markAllAsTouched();

    const body = {
      "name": this.formatCamelCase(this.foreignDonationForm.value.name),
      // "address": this.formatCamelCase(this.foreignDonationForm.value.address),
      "emailId": this.foreignDonationForm.value.emailId,
      "contactNo":  "+" + this.countryList.filter((ele: any) => ele.countryId == this.foreignDonationForm.value.country)[0].dialCode + "-" +  this.foreignDonationForm.value.contactNo,
      "countryId": {
        "countryId": this.foreignDonationForm.value.country
      },
      // "stateId": this.foreignDonationForm.value.states,
      "areYouIndian": "N",
      // "want80gBenefits": this.formatCamelCase(this.foreignDonationForm.value.want80gBenefits),
      // "panNumber": this.foreignDonationForm.value.panNumber,
      // "adhaarNumber": this.foreignDonationForm.value.adhaarNumber,
      "taxPayer": this.foreignDonationForm.value.taxPayer,
      "passport": this.foreignDonationForm.value.passport,
      "photoIdentity": this.foreignDonationForm.value.photoIdentity,
      "message": this.formatCamelCase(this.foreignDonationForm.value.message),
      "donationTypeId": {
        "typeId": Number(this.foreignDonationForm.value.donationTypeId)
      },
      "transactionId": null,
      "amount": this.foreignDonationForm.value.amount,
      "status": null
    }
    // console.log(body);

    this.razorPay(body);
  }

  formatCamelCase(value: any) {
    return value && value.charAt(0).toUpperCase() + value.slice(1)
  }

  razorPay(body: any) {
    const RozarpayOptions = {
      description: 'Traditional Yoga',
      currency: 'USD',
      amount: this.foreignDonationForm.value.amount * 100,
      name: this.foreignDonationForm.value.name,
      email: this.foreignDonationForm.value.emailId,
      key: 'rzp_test_B2m3YHYyq8Zbn6',
      image: 'assets/img/donation-logo.png',
      handler: function (response: any) {
        console.log(response);
        if (response != null && response.razorpay_payment_id != null) {
          processResponse(response);
        } else {
          cancelCallback(response);
        }
      },
      prefill: {
        name: this.foreignDonationForm.value.name,
        email: this.foreignDonationForm.value.emailId,
        phone: this.foreignDonationForm.value.contactNo
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    }

    var processResponse = (payment_id: any) => {
      console.log('payment_id: ' + payment_id.razorpay_payment_id);
      body.transactionId = payment_id.razorpay_payment_id;
      body.status = "Paid";
      // this.donarRecords(body); // testing phase
    };

    var cancelCallback = (error: any) => {
      alert(error.description + ' (Error ' + error.code + ')');
      body.transactionId = null;
      body.status = "Failed";
    };

    var razorpay_object = new Razorpay(RozarpayOptions);
    razorpay_object.open();
  }
  inputChange() {
    this.indianPaymentErrorMessage = undefined
    this.indianPaymentSuccessMessage = undefined

  }

  donarRecords(body: any) {
    this.indianPaymentSuccessMessage = undefined
    this.indianPaymentErrorMessage = undefined    
    this.donationService.donateForeign(body).subscribe({
      next: (response: any) => {
        console.info(response);
        this.indianPaymentSuccessMessage = "We appreciate the gift you gave. We and the neighbourhood we serve are deeply grateful for your support."
        this.foreignDonationForm.reset()
      },
      error: (error: any) => {
        console.error(error.message);
        this.indianPaymentErrorMessage = "Payment was unsuccessful. Please try again."
        this.indianPaymentSuccessMessage = undefined
      }
    });
  }

  changeDonationType() {
    // console.log();
    if (this.foreignDonationForm.value.donationTypeId == 1) {
      this.minAmount = 60;
      const contactNoControl = this.foreignDonationForm.get('amount') as FormControl;
      contactNoControl.setValidators(Validators.compose([Validators.required, Validators.min(this.minAmount)]));
      contactNoControl.updateValueAndValidity();
    } else {
      this.minAmount = 0;
      const contactNoControl = this.foreignDonationForm.get('amount') as FormControl;
      contactNoControl.setValidators(Validators.compose([Validators.required, Validators.min(this.minAmount)]));
      contactNoControl.updateValueAndValidity();
    }
  }

  close() {
    this.router.navigateByUrl('/donations#donations-circle');
  }
}
