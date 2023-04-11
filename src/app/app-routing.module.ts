import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './module/about-us/about-us.component';
import { DonationsComponent } from './module/donations/donations.component';
import { GalleryComponent } from './module/gallery/gallery.component';
import { LandingPageComponent } from './module/landing-page/landing-page.component';
import { OurOfferingsComponent } from './module/our-offerings/our-offerings.component';
import { VedicNeutraceuticlesComponent } from './module/vedic-neutraceuticles/vedic-neutraceuticles.component';

const routes: Routes = [

  { path: '', component: LandingPageComponent },
  { path: 'vedic-neutraceuticles', component: VedicNeutraceuticlesComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'offerings', component: OurOfferingsComponent },
  { path: 'donations', component: DonationsComponent },
  { path: 'gallery', component: GalleryComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


