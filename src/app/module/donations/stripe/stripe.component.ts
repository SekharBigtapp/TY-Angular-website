import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
// import { Stripe } from '@fireflysemantics/angular-stripe-service/lib/types';
// import { Stripe  } from 'stripe';
// import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { loadStripe, Stripe, StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
import { DonationService } from '../donation.service';
import { error } from 'console';
// import { StripeService, StripeCard } from 'fireflysemantics/angular-stripe-service';
// import { Stripe, StripeCardElement } from '@stripe/stripe-js';



@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
// export class StripeComponent implements OnInit, AfterViewInit, OnDestroy {
export class StripeComponent implements AfterViewInit {

  @ViewChild('cardElement') cardElement: ElementRef | any;

  stripe: any;
  clientSecret: any;
  card: StripeCardElement | any;

  responseData: any;
  // stripeForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBarRef: MatDialogRef<StripeComponent>,
    private donationService: DonationService,
    // private http: HttpClient
    // private cd: ChangeDetectorRef,
    // private stripeService: AngularStripeService,
    // private formBuilder: FormBuilder
  ) {
    // const apiKey = 'pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp';
    // const config: Stripe.StripeConfig = {
    //   apiVersion: '2022-11-15'
    // };

    // this.stripe = new Stripe(apiKey, config);
    // this.stripe = new Stripe(apiKey, config);
    // this.stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');

    // const apiTestKey = 'pk_test_51N5Up0SCvJyGiavaIsVoO9DRnb3ZOt2D9NQT19BYq7zInqmfagkg4hjD9v4s5iEYxnWzKyOxHGGY395ztW4xHERW008uH0N5he'
    // const apiLiveKey = 'pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp'
    // this.initializeStripe(apiTestKey);
  }

  ngAfterViewInit() {
    const apiTestKey = 'pk_test_51N5Up0SCvJyGiavaIsVoO9DRnb3ZOt2D9NQT19BYq7zInqmfagkg4hjD9v4s5iEYxnWzKyOxHGGY395ztW4xHERW008uH0N5he'
    const apiLiveKey = 'pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp'
    this.initializeStripe(apiTestKey);

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

  async initializeStripe(publishableKey: string) {
    this.stripe = await loadStripe(publishableKey);

    const elements = this.stripe.elements();
    const cardOptions: StripeCardElementOptions = {
      style: {
        base: {
          fontSize: '16px'
        }
      }
    };
    this.card = elements.create('card', cardOptions);
    this.card.mount(this.cardElement.nativeElement);

  }

  async submitDonationForm() {
    // Collect the necessary payment details from the form
    const amount = 1000; // Example: donation amount in paisa
    const name = 'John Doe';
    const email = 'john.doe@example.com';

    // Create the payment intent on your server and retrieve the client secret
    const paymentIntentData = await this.createPaymentIntent(amount, name, email);
    // console.log(paymentIntentData);
    // this.clientSecret = paymentIntentData.clientSecret;
    // console.log(this.clientSecret);
    // this.clientSecret = "pi_3ND3kvSBUbthP8c71anYqyu8_secret_gZwslmn5aIjmQ9oMAr7FHvLKo";
    // console.log(this.clientSecret);

    // this.clientSecret = "pi_3N8nYGSCvJyGiava10GmAF2b";
    // // Confirm the payment with Stripe
    // const { error } = this.stripe.confirmCardPayment(this.clientSecret, {
    //   payment_method: {
    //     // card: this.stripe.elements.getElement('card')
    //     card: this.card,
    //   }
    // });

    // if (error) {
    //   console.error('Payment confirmation error:', error);
    //   // Handle the error and display an appropriate message to the user
    // } else {
    //   // Payment succeeded
    //   console.log('Payment confirmed!');
    //   // Display a success message to the user
    // }

  }

  async createPaymentIntent(amount: number, name: string, email: string): Promise<any> {
    // Send a request to your backend API to create the payment intent
    // Include the necessary payment details in the request payload

    const body = {
      "amount": amount,
      "name": name,
      "email": email
    }
    this.donationService.paymentIntent(body).subscribe({
      next: (response) => {
        this.responseData = response;
        this.clientSecret = this.responseData.clientSecret;
        console.log(this.clientSecret);
        // return this.responseData.json();
        // return data.json();
        const { error } = this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            // card: this.stripe.elements.getElement('card')
            card: this.card,
          }
        });

        if (error) {
          console.error('Payment confirmation error:', error);
          // Handle the error and display an appropriate message to the user
        } else {
          // Payment succeeded
          console.log('Payment confirmed!');
          // Display a success message to the user
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async createPaymentIntent2(amount: number, name: string, email: string): Promise<any> {
    // const url = '/your-backend-api/create-payment-intent'; // Replace with your actual backend API endpoint

    // try {
    //   const response = await this.http.post(url, {
    //     amount,
    //     name,
    //     email
    //   }).toPromise();

    //   return response;
    // } catch (error) {
    //   console.error('Error creating payment intent:', error);
    //   // Handle the error and display an appropriate message to the user
    //   throw error;
    // }
  }

  close() {

  }

  // @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef | any;
  // @ViewChild('cardElement') cardElement: ElementRef | any;

  // stripe: any;
  // stripe: Stripe | any;
  // cardElement: StripeCardElement | any;
  // amount: number = 1000;

  // stripe: any;
  // card: any;
  // amount: number = 1000; // Set the amount in the smallest currency unit (e.g., cents)
  // clientSecret: string | any;

  // loading = false;
  // confirmation: any;

  // card: any;
  // cardHandler = this.onChange.bind(this);
  // error: any;


  // ngOnInit() {
  //   // console.log(this.data);
  //   // const apiTestKey = 'pk_test_51N5Up0SCvJyGiavaIsVoO9DRnb3ZOt2D9NQT19BYq7zInqmfagkg4hjD9v4s5iEYxnWzKyOxHGGY395ztW4xHERW008uH0N5he'
  //   // const apiLiveKey = 'pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp'
  //   // this.stripe = await loadStripe(apiTestKey);

  //   // this.stripe = Stripe(apiTestKey);
  //   // const elements = this.stripe.elements();
  //   // this.card = elements.create('card');
  //   // this.card.mount(this.cardElement.nativeElement);

  //   // // Retrieve the client secret from your server
  //   // this.getClientSecretFromServer();
  // }

  // async getClientSecretFromServer() {
  //   // Make an API call to your server to retrieve the client secret
  //   // You can generate the client secret on the server using the Stripe API
  //   const response = await fetch('/your-server-endpoint');

  //   if (response.ok) {
  //     const data = await response.json();
  //     this.clientSecret = data.clientSecret;
  //   } else {
  //     console.error('Failed to retrieve client secret from the server');
  //   }
  // }

  // async createPayment() {
  //   const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
  //     payment_method: {
  //       card: this.card,
  //     }
  //   });

  //   if (error) {
  //     console.error('Stripe confirmCardPayment error:', error);
  //   } else if (paymentIntent.status === 'succeeded') {
  //     // Payment successful
  //     console.log('Payment successful');
  //   } else {
  //     // Payment failed
  //     console.error('Payment failed');
  //   }
  // }

  // ngAfterViewInit() {
  //   // this.stripeService.setPublishableKey('pk_live_51N5Up0SCvJyGiavajbivROGASm6RixQUrnvDNuhZTvu9dWTZpmRUbfEqRHlYfN8W6HftFxhx9Cwv1SasE5VIbVSC00eCE4z3Cp').then(
  //   //   stripe => {
  //   //     console.log(stripe);
  //   //     this.stripe = stripe;
  //   //     const elements = stripe.elements();
  //   //     this.card = elements.create('card');
  //   //     this.card.mount(this.cardInfo.nativeElement);
  //   //     this.card.addEventListener('change', this.cardHandler);
  //   //   }
  //   // );
  // }

  // ngOnDestroy() {
  //   // this.card.removeEventListener('change', this.cardHandler);
  //   // this.card.destroy();
  // }

  // onChange(error: any) {
  //   if (error) {
  //     this.error = error.message;
  //   } else {
  //     this.error = null;
  //   }
  //   this.cd.detectChanges();
  // }

  // async onSubmit(form: NgForm) {
  //   // const { token, error } = await this.stripe.createToken(this.card);

  //   // if (error) {
  //   //   console.log('Error:', error);
  //   // } else {
  //   //   console.log('Success!', token);
  //   // }
  // }




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
