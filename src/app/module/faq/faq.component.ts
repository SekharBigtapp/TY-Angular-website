import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit  {

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
 


  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
  }

}