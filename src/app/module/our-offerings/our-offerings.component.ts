import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-offerings',
  templateUrl: './our-offerings.component.html',
  styleUrls: ['./our-offerings.component.css']
})
export class OurOfferingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
  }

}
