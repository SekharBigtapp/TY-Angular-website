import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-offerings',
  templateUrl: './our-offerings.component.html',
  styleUrls: ['./our-offerings.component.css']
})
export class OurOfferingsComponent implements OnInit {
  disabledAgreement: boolean = false;
  constructor(private router: Router) { }

  isShow: boolean = true;
  topPosToStartShowing = 100;
  

  @HostListener('window:scroll')



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


  ngOnInit(): void {

    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });

    $('#video').hover(function toggleControls() {
      if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
      } else {
        this.setAttribute("controls", "controls")
      }
    })

    $('#video1').hover(function toggleControls() {
      if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
      } else {
        this.setAttribute("controls", "controls")
      }
    })


  }

  KnowMore(){
     this.router.navigateByUrl("aboutUs")
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
