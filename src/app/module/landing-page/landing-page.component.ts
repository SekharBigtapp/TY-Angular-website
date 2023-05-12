import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  isShow: boolean = true;
  topPosToStartShowing = 100;

  disabledAgreement: boolean = false;

  
  constructor(private router: Router) { }
  @HostListener('window:scroll')

  
  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });

    $('video').on('click', function(e) {
        let videoID : any = $(this).attr('id');
        debugger;
        $( "video" ).each(function( index:any ) {
            let ctrlVideo : any = document.getElementById("video-thumbs"+index);
            if(videoID!="video-thumbs"+index){
              ctrlVideo.pause();
            }
        });

        let ctrlVideo : any = document.getElementById(videoID);
        $("#"+ctrlVideo).addClass('active');
        ctrlVideo.trigger('play');

    });
    
  let ctrlVideo : any = document.getElementById("video"); 
  
  $('#play-btn').click(function(){
    if ($('#play-btn').hasClass("active")){
        ctrlVideo.play();
        
        $('#play-btn').html('<i class="fa fa-pause"></i>');
        $('#play-btn').toggleClass("active");
    } else {
    
        ctrlVideo.pause();
        
        $('#play-btn').html('<i class="fa fa-play"></i>');
        $('#play-btn').toggleClass("active");
        // $('#play-btn').style.display = 'none'
        
    }
  });
  
  $('#video').hover(function toggleControls() {
    if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
    } else {
        this.setAttribute("controls", "controls")
    }
})

$('#video-thumbs').hover(function toggleControls() {
  if (this.hasAttribute("controls")) {
      this.removeAttribute("controls")
  } else {
      this.setAttribute("controls", "controls")
  }
})

  }

  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
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
  
  KnowMore(element:any){
    this.router.navigate(["aboutUs"], {fragment : element});
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

isCheckboxenabled(event:any){
  console.log(event);
  let isChecked = event.target.checked;
  if(isChecked==false){
      this.disabledAgreement = false;
  }else{
    this.disabledAgreement = true;
  }
}


}
