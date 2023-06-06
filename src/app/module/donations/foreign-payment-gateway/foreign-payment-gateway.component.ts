import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../donation.service';

@Component({
  selector: 'app-foreign-payment-gateway',
  templateUrl: './foreign-payment-gateway.component.html',
  styleUrls: ['./foreign-payment-gateway.component.css']
})
export class ForeignPaymentGatewayComponent implements OnInit {

  foreignDonationForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private donationService: DonationService
    ) { }

  ngOnInit(): void {
    this.foreignDonationForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
    });
  }

  close() {
    this.router.navigateByUrl('/donations#donations-circle');
  }
}
