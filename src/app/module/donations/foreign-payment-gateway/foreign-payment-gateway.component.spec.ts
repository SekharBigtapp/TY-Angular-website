import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignPaymentGatewayComponent } from './foreign-payment-gateway.component';

describe('ForeignPaymentGatewayComponent', () => {
  let component: ForeignPaymentGatewayComponent;
  let fixture: ComponentFixture<ForeignPaymentGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignPaymentGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForeignPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
