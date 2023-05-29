import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foreign-payment-gateway',
  templateUrl: './foreign-payment-gateway.component.html',
  styleUrls: ['./foreign-payment-gateway.component.css']
})
export class ForeignPaymentGatewayComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  close() {
    this.router.navigateByUrl('/donations#click-abroad');
  }
}
