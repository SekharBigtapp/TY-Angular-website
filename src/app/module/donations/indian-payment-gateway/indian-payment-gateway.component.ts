import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StripeComponent } from '../stripe/stripe.component';
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
  indianPaymentErrorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private donationService: DonationService,
  ) { }

  ngOnInit(): void {
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
      amount: [null, Validators.compose([Validators.required])],
      message: [null, Validators.compose([Validators.required])],
    });

    this.donationType();
  }

  makeIndianPayment() {
    this.indianPaymentErrorMessage = undefined;
    if (this.indiandonationForm.invalid)
      return this.indiandonationForm.markAllAsTouched();
    console.log(this.indiandonationForm.value);

    const body = {
      "name": this.formatCamelCase(this.indiandonationForm.value.name),
      "address": this.formatCamelCase(this.indiandonationForm.value.address),
      "emailId" : this.indiandonationForm.value.emailId,
      "contactNo" : this.indiandonationForm.value.contactNo,
      "areYouIndian": this.formatCamelCase(this.indiandonationForm.value.areYouIndian),
      "want80gBenefits": this.formatCamelCase(this.indiandonationForm.value.want80gBenefits),
      "panNumber":this.indiandonationForm.value.panNumber,
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

  razorPay(body : any) {
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
      console.log('payment_id: ' + payment_id);
      body.transactionId = payment_id;
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

  donarRecords(body : any) {
    this.donationService.donate(body).subscribe({
      next: (response: any) => {
        // this.donationList = response;
        console.info(response);
      },
      error: (error: any) => {
        console.error(error.message);
      }
    });
  }

  close() {
    this.router.navigateByUrl('/donations#click-abroad');
  }

}
