import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianPaymentGatewayComponent } from './indian-payment-gateway.component';

describe('IndianPaymentGatewayComponent', () => {
  let component: IndianPaymentGatewayComponent;
  let fixture: ComponentFixture<IndianPaymentGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndianPaymentGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndianPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
