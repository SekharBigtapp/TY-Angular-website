import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

   locationto:any
   disabledAgreement: boolean = false;
  constructor(private router: Router,private activeroute:ActivatedRoute) { 
    this.locationto=this.activeroute.snapshot.paramMap.get('id')
  }

  isShow: boolean = true;
  topPosToStartShowing = 100;
  

  // @HostListener('window:scroll')



  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    // const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // console.log('[scroll]', scrollPosition);
    
    // if (scrollPosition >= this.topPosToStartShowing) {
    //   this.isShow = true;
    // } else {
    //   this.isShow = false;
    // }
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
    let element;
    if(this.locationto=='alv')
    {
      element=document.getElementById('alv')
    }
    else if(this.locationto=='yoga')
    {
      element=document.getElementById('yyy')
    }
    else if (this.locationto=='about'){
      element=document.getElementById('about')
    }
    
    console.log(element);
    
    this.scrollto(element)

   
  }
  scrollto(ele:any){
    ele?.scrollIntoView();
    console.log('working');
    
  }

  DonationPage(){
    this.router.navigateByUrl("donations")
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
