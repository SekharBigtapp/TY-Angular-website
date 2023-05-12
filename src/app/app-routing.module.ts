import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './module/about-us/about-us.component';
import { DonationsComponent } from './module/donations/donations.component';
import { FaqComponent } from './module/faq/faq.component';
import { GalleryComponent } from './module/gallery/gallery.component';
import { LandingPageComponent } from './module/landing-page/landing-page.component';
import { OurOfferingsComponent } from './module/our-offerings/our-offerings.component';
import { UpcomingCoursesComponent } from './module/upcoming-courses/upcoming-courses.component';
import { VedicNeutraceuticlesComponent } from './module/vedic-neutraceuticles/vedic-neutraceuticles.component';

const routes: Routes = [

  { path: '', component: LandingPageComponent },
  { path: 'vedic-neutraceuticles', component: VedicNeutraceuticlesComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'offerings', component: OurOfferingsComponent },
  { path: 'donations', component: DonationsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'faqs', component: FaqComponent },
  { path: 'upComingCourses', component: UpcomingCoursesComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {// Restore the last scroll position
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    // Enable scrolling to anchors
    anchorScrolling: "enabled",
    //scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


