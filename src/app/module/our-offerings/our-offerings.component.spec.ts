import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurOfferingsComponent } from './our-offerings.component';

describe('OurOfferingsComponent', () => {
  let component: OurOfferingsComponent;
  let fixture: ComponentFixture<OurOfferingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurOfferingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
