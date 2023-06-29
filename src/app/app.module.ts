import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { LandingPageComponent } from './module/landing-page/landing-page.component';
import { AboutUsComponent } from './module/about-us/about-us.component';
import { VedicNeutraceuticlesComponent } from './module/vedic-neutraceuticles/vedic-neutraceuticles.component';
import { OurOfferingsComponent } from './module/our-offerings/our-offerings.component';
import { DonationsComponent } from './module/donations/donations.component';
import { GalleryComponent } from './module/gallery/gallery.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FaqComponent } from './module/faq/faq.component';
import { UpcomingCoursesComponent } from './module/upcoming-courses/upcoming-courses.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { GalleryPopUpComponent } from './module/gallery/gallery-pop-up/gallery-pop-up.component';
import { IndianPaymentGatewayComponent } from './module/donations/indian-payment-gateway/indian-payment-gateway.component';
import { ForeignPaymentGatewayComponent } from './module/donations/foreign-payment-gateway/foreign-payment-gateway.component';
import { GaleryPaginationModule } from './module/gallery/galery-pagination/galery-pagination.module';
import { NumberDirective } from './core/directives/number.directive';
import { AmountDirective } from './core/directives/amount.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    AboutUsComponent,
    VedicNeutraceuticlesComponent,
    OurOfferingsComponent,
    DonationsComponent,
    GalleryComponent,
    FaqComponent,
    UpcomingCoursesComponent,
    GalleryPopUpComponent,
    IndianPaymentGatewayComponent,
    ForeignPaymentGatewayComponent,
    NumberDirective,
    AmountDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    NgbModule,
    GaleryPaginationModule,
    NgxCaptchaModule

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
