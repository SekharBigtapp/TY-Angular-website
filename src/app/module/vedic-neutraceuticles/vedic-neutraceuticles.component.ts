import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vedic-neutraceuticles',
  templateUrl: './vedic-neutraceuticles.component.html',
  styleUrls: ['./vedic-neutraceuticles.component.css']
})
export class VedicNeutraceuticlesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
  }

}
