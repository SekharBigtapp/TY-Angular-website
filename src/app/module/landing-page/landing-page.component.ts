import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

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
  // slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};

  slideConfig = {
    method: {},
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  KnowMore(){
    this.router.navigateByUrl("aboutUs")
 }

 DonatePage(){
  this.router.navigateByUrl("donations")
}

OurOfferingsPage(){
  this.router.navigateByUrl("offerings")
}

CourseDetailsPage(){
  this.router.navigateByUrl("upComingCourses")
}
  


}
