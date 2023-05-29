import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
// import { Stripe } from '@fireflysemantics/angular-stripe-service/lib/types';
// import { Stripe  } from 'stripe';
// import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
// import { StripeService, StripeCard } from 'fireflysemantics/angular-stripe-service';
// import { Stripe, StripeCardElement } from '@stripe/stripe-js';



@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef | any;
  @ViewChild('cardElement') cardElement: ElementRef | any;

  // stripe: any;
  // stripe: Stripe | any;
  // cardElement: StripeCardElement | any;
  // amount: number = 1000;

  stripe: any;
  card: any;
  amount: number = 1000; // Set the amount in the smallest currency unit (e.g., cents)
  clientSecret: string | any;

  loading = false;
  confirmation: any;

  // card: any;
  // cardHandler = this.onChange.bind(this);
  // error: any;

  stripeForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBarRef: MatDialogRef<StripeComponent>,
    private cd: ChangeDetectorRef,
    private stripeService: AngularStripeService,
    private formBuilder: FormBuilder
  ) {
    // const apiKey = 'pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp';
    // const config: Stripe.StripeConfig = {
    //   apiVersion: '2022-11-15'
    // };

    // this.stripe = new Stripe(apiKey, config);
    // this.stripe = new Stripe(apiKey, config);
    // this.stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');
  }

  async ngOnInit() {
    // console.log(this.data);
    const apiTestKey = 'pk_test_51N5Up0SCvJyGiavaIsVoO9DRnb3ZOt2D9NQT19BYq7zInqmfagkg4hjD9v4s5iEYxnWzKyOxHGGY395ztW4xHERW008uH0N5he'
    const apiLiveKey = 'pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp'
    this.stripe = await loadStripe(apiTestKey);

    // this.stripe = Stripe(apiTestKey);
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    // Retrieve the client secret from your server
    this.getClientSecretFromServer();
  }

  async getClientSecretFromServer() {
    // Make an API call to your server to retrieve the client secret
    // You can generate the client secret on the server using the Stripe API
    const response = await fetch('/your-server-endpoint');

    if (response.ok) {
      const data = await response.json();
      this.clientSecret = data.clientSecret;
    } else {
      console.error('Failed to retrieve client secret from the server');
    }
  }

  async createPayment() {
    const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card,
      }
    });

    if (error) {
      console.error('Stripe confirmCardPayment error:', error);
    } else if (paymentIntent.status === 'succeeded') {
      // Payment successful
      console.log('Payment successful');
    } else {
      // Payment failed
      console.error('Payment failed');
    }
  }

  ngAfterViewInit() {
    // this.stripeService.setPublishableKey('pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp').then(
    //   stripe => {
    //     console.log(stripe);
    //     this.stripe = stripe;
    //     const elements = stripe.elements();
    //     this.card = elements.create('card');
    //     this.card.mount(this.cardInfo.nativeElement);
    //     this.card.addEventListener('change', this.cardHandler);
    //   }
    // );
  }

  ngOnDestroy() {
    // this.card.removeEventListener('change', this.cardHandler);
    // this.card.destroy();
  }

  // onChange(error: any) {
  //   if (error) {
  //     this.error = error.message;
  //   } else {
  //     this.error = null;
  //   }
  //   this.cd.detectChanges();
  // }

  async onSubmit(form: NgForm) {
    // const { token, error } = await this.stripe.createToken(this.card);

    // if (error) {
    //   console.log('Error:', error);
    // } else {
    //   console.log('Success!', token);
    // }
  }

  close() {

  }


  // async createToken() {
  //   const cardElement = this.stripe.elements().create('card');
  //   const result = await this.stripe.createToken(cardElement);

  //   if (result.error) {
  //     console.error('Stripe createToken error:', result.error);
  //   } else {
  //     const token = result.token;
  //     console.log('Payment token:', token);
  //     // Send the token to your server for processing the payment
  //   }
  // }

  // async createToken() {
  //   const elements = this.stripe?.elements();
  //   this.cardElement = elements?.create('card');
  //   const result = await this.stripe?.createToken(this.cardElement!);

  //   if (result?.error) {
  //     console.error('Stripe createToken error:', result.error);
  //   } else {
  //     const token = result?.token;
  //     console.log('Payment token:', token);
  //     console.log("Forwarding to Payment Process")
  //     // Send the token to your server for processing the payment
  //     this.processPayment(token?.id);
  //   }
  // }

  // async processPayment(tokenId: string | undefined) {
  //   // Send the token ID and the amount to your server for processing the payment
  //   const response = await fetch('/your-payment-endpoint', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       token: tokenId,
  //       amount: this.amount
  //     })
  //   });

  //   if (response.ok) {
  //     // Payment successful
  //     console.log('Payment successful');
  //   } else {
  //     // Payment failed
  //     console.error('Payment failed');
  //   }
  // }

}
