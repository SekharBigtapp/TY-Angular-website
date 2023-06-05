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
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public snackBarRef: MatDialogRef<IndianPaymentGatewayComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private paymentIndian: MatDialog,
    private donationService: DonationService,
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
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
    });

    this.donationType();
  }

  makeIndianPayment() {
    // this.indianPaymentErrorMessage = undefined;
    // if (this.indiandonationForm.invalid)
    //   return this.indiandonationForm.markAllAsTouched();

    // console.log(this.indiandonationForm.value);
    // const { name, emailId, address, adhaarNumber, areYouIndian, want80gBenefits, panNumber, donationTypeId, message } = this.indiandonationForm.value
    // const body = {
    //   "name": this.formatCamelCase(name),
    //   emailId,
    //   "address": this.formatCamelCase(address),
    //   adhaarNumber,
    //   "areYouIndian": this.formatCamelCase(areYouIndian),
    //   "want80gBenefits": this.formatCamelCase(want80gBenefits),
    //   panNumber,
    //   "message": this.formatCamelCase(message),
    //   "donationTypeId": {
    //     "typeId": Number(donationTypeId)
    //   },
    //   "transactionId": "stripe_transaction_id",
    //   "amount": Number(1000),
    //   "status": "Success"
    // }
    // this.service.indianDonationPayment(body).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //     this.indianPaymentErrorMessage = this.formatCamelCase("Failed to process payment.")
    //   }
    // });

    /* const dialoagIndianPay = this.paymentIndian.open(StripeComponent, {
      data: this.indiandonationForm,
      width: "70%",
      height: "70%"
    });
    dialoagIndianPay.afterClosed().subscribe(payStatus => { }); */

    const RozarpayOptions = {
      description: 'Traditional Yoga',
      currency: 'INR',
      amount: 100 * 100,
      name: 'Traditional Yoga',
      key: 'rzp_test_bAQcJpstU6rS07',
      image: '../assets/img/donation-logo.png',
      handler: function (response: any){
        console.log(response);
        if(response!=null && response.razorpay_payment_id != null){
          processResponse(response);
        }else{
          cancelCallback(response);
        }
      },
      prefill: {
        name: 'Krishna Kishore Nana',
        email: 'kishore.n@bigtappanalytics.com',
        phone: '9885143314'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed');
        }
      }
    }

    var processResponse = (payment_id: any) => {
      console.log('payment_id: ' + payment_id);
    };
    
    var cancelCallback = (error: any) => {
      alert(error.description + ' (Error ' + error.code + ')');
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

  close() {
    this.router.navigateByUrl('/donations#click-abroad');
  }

}
