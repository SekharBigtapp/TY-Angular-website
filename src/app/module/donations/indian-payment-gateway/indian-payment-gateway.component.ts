import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StripeComponent } from '../stripe/stripe.component';
import { DonationService } from '../donation.service';

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

    const dialoagIndianPay = this.paymentIndian.open(StripeComponent, {
      data: this.indiandonationForm,
      width: "70%",
      height: "80%"
    });
    dialoagIndianPay.afterClosed().subscribe(payStatus => { });
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
