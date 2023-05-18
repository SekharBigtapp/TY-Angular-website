import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vedic-neutraceuticles',
  templateUrl: './vedic-neutraceuticles.component.html',
  styleUrls: ['./vedic-neutraceuticles.component.css']
})
export class VedicNeutraceuticlesComponent implements OnInit {
  disabledAgreement: boolean = false;
  constructor(private router: Router) { }

  isShow: boolean = true;
  topPosToStartShowing = 300;
  windowScrolled: boolean | undefined;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
        this.windowScrolled = true;
    } 
   else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
        this.windowScrolled = false;
    }
  }

  
 

  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
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


  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
 
     console.log('[scroll]', scrollPosition);
 
     if (scrollPosition >= this.topPosToStartShowing) {
       console.log(scrollPosition)
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

}
