import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../donation.service';

declare var Razorpay: any;

@Component({
  selector: 'app-indian-payment-gateway',
  templateUrl: './indian-payment-gateway.component.html',
  styleUrls: ['./indian-payment-gateway.component.css']
})
export class IndianPaymentGatewayComponent implements OnInit {

  indiandonationForm!: FormGroup;
  donationList!: any;
  statesList!: any;
  indianPaymentErrorMessage: any;
  minAmount: any = 5000;
  indianPaymentSuccessMessage: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private donationService: DonationService,
  ) { }

  ngOnInit(): void {
    this.indiandonationForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      states: [null, Validators.compose([Validators.required])],
      emailId: [null, Validators.compose([Validators.email, Validators.required])],
      contactNo: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      want80gBenefits: [null, Validators.compose([Validators.required])],
      panNumber: [null, Validators.compose([])],
      adhaarNumber: [null, Validators.compose([Validators.minLength(19)])],
      donationTypeId: [null, Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.min(this.minAmount)])],
      message: [null, Validators.compose([Validators.required])],
    });

    this.donationType();
    this.getStates();
  }


  makeIndianPayment() {
    this.indianPaymentErrorMessage = undefined;
    // console.log(this.indiandonationForm);
    if (this.indiandonationForm.invalid)
      return this.indiandonationForm.markAllAsTouched();
    // console.log(this.indiandonationForm.value);

    const body = {
      "name": this.formatCamelCase(this.indiandonationForm.value.name),
      "address": this.formatCamelCase(this.indiandonationForm.value.address),
      "emailId": this.indiandonationForm.value.emailId,
      "contactNo": this.indiandonationForm.value.contactNo,
      "countryId": {
        "countryId": 104
      },
      "stateId": this.indiandonationForm.value.states,
      "areYouIndian": "Y",
      "want80gBenefits": this.formatCamelCase(this.indiandonationForm.value.want80gBenefits),
      "panNumber": this.indiandonationForm.value.panNumber,
      "adhaarNumber": this.indiandonationForm.value.adhaarNumber,
      "message": this.formatCamelCase(this.indiandonationForm.value.message),
      "donationTypeId": {
        "typeId": Number(this.indiandonationForm.value.donationTypeId)
      },
      "transactionId": null,
      "amount": this.indiandonationForm.value.amount,
      "status": null
    }
    // this.indianPaymentErrorMessage = this.formatCamelCase("Failed to process payment.");

    this.razorPay(body);
  }

  formatCamelCase(value: any) {
    return value && value.charAt(0).toUpperCase() + value.slice(1)
  }

  razorPay(body: any) {
    const RozarpayOptions = {
      description: 'Traditional Yoga',
      currency: 'INR',
      amount: this.indiandonationForm.value.amount * 100,
      name: this.indiandonationForm.value.name,
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
        name: this.indiandonationForm.value.name,
        email: this.indiandonationForm.value.emailId,
        phone: this.indiandonationForm.value.contactNo
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
      this.donarRecords(body);
    };

    var cancelCallback = (error: any) => {
      alert(error.description + ' (Error ' + error.code + ')');
      body.transactionId = null;
      body.status = "Failed";
    };

    var razorpay_object = new Razorpay(RozarpayOptions);
    razorpay_object.open();
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

  getStates() {
    this.donationService.getStates().subscribe({
      next: (response: any) => {
        this.statesList = response;
      },
      error: (error: any) => {
        console.error(error.message);
      }
    });
  }
  inputChange() {
    this.indianPaymentErrorMessage = undefined
    this.indianPaymentSuccessMessage = undefined

  }
  donarRecords(body: any) {
    this.indianPaymentSuccessMessage = undefined
    this.indianPaymentErrorMessage = undefined

    this.donationService.donate(body).subscribe({
      next: (response: any) => {
        // this.donationList = response;
        // console.info(response);
        this.indianPaymentSuccessMessage = "We appreciate the gift you gave. We and the neighbourhood we serve are deeply grateful for your support."
        this.indiandonationForm.reset()
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
    if (this.indiandonationForm.value.donationTypeId == 1) {
      this.minAmount = 5000;
      const contactNoControl = this.indiandonationForm.get('amount') as FormControl;
      contactNoControl.setValidators(Validators.compose([Validators.required, Validators.min(this.minAmount)]));
      contactNoControl.updateValueAndValidity();
    } else {
      this.minAmount = 0;
      const contactNoControl = this.indiandonationForm.get('amount') as FormControl;
      contactNoControl.setValidators(Validators.compose([Validators.required, Validators.min(this.minAmount)]));
      contactNoControl.updateValueAndValidity();
    }
  }

  close() {
    this.router.navigateByUrl('/donations#donations-circle');
  }

}