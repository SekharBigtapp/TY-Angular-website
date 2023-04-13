import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
  }

  slides = [
    {img: "assets/img/testimonial-video-img.png",},
    {img: "assets/img/testimonial-video-img.png"},
    {img: "assets/img/testimonial-video-img.png"},
    {img: "assets/img/testimonial-video-img.png"},
    {img: "assets/img/testimonial-video-img.png"},
    {img: "assets/img/testimonial-video-img.png"},
    {img: "assets/img/testimonial-video-img.png"},
    {img: "assets/img/testimonial-video-img.png"}
  ];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  


}
