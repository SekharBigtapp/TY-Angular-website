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
    UpcomingCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
