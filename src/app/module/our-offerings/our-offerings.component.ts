import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-offerings',
  templateUrl: './our-offerings.component.html',
  styleUrls: ['./our-offerings.component.css']
})
export class OurOfferingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
  }

  KnowMore(){
     this.router.navigateByUrl("aboutUs")
  }

}
