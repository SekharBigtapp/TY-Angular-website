import { Component, OnInit, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from 'src/app/core/services/landing_page/landing-page.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  locationto: any
  disabledAgreement: boolean = false;
  constructor(private router: Router, private activeroute: ActivatedRoute, private service: LandingPageService, private formBuilder: FormBuilder) {
    this.locationto = this.activeroute.snapshot.paramMap.get('id')
  }

  isShow: boolean = true;
  topPosToStartShowing = 300;
  isloading: boolean = false
  windowScrolled: boolean | undefined;


  touchForm!: FormGroup
  countryList: any = []

  errorMessage: any = undefined
  messageSent: boolean = false

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
    //debugger;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function (e) {
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

    let element;
    if (this.locationto == 'alv') {
      element = document.getElementById('alv')
    }
    else if (this.locationto == 'yoga') {
      element = document.getElementById('yyy')
    }
    else if (this.locationto == 'about') {
      element = document.getElementById('about')
    }

    console.log(element);

    this.scrollto(element)

    this.touchForm = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      country: [null, Validators.compose([Validators.required])],
      query: [null, Validators.compose([Validators.required])]
    })
    this.getCountryDetails()
  }

  getCountryDetails() {
    this.service.countryList().subscribe({
      next: (response: any) => {
        this.countryList = response
      },
      error: (error: any) => {
        console.error(error);

      }
    })
  }

  formatCamelCase(value: any) {
    return value && value.charAt(0).toUpperCase() + value.slice(1)
  }

  changefield() {
    this.messageSent = false
  }
  submitTouch() {
    this.errorMessage = undefined;
    this.messageSent = false
    const { name, country, query, phoneNumber, email } = this.touchForm.value

    if (this.touchForm.invalid) {
      // this.errorMessage = "Form is invalid"
      // console.log(this.errorMessage);
      return this.touchForm.markAllAsTouched()
    }
    this.isloading = true
    const body =

    {
      "name": this.formatCamelCase(name),
      "emailId": email,
      "mobileNumber": "+" + this.countryList.filter((ele: any) => ele.countryId == country)[0].dialCode + "-" + phoneNumber,
      "country": {
        "countryId": Number(country)
      },
      "query": this.formatCamelCase(query)
    }

    this.service.getInTouchAdd(body).subscribe({
      next: (response: any) => {
        this.touchForm.reset()
        this.messageSent = true
        this.isloading = false
        this.disabledAgreement = false
        // setTimeout(() => {
        //   this.messageSent = false
        //   this.errorMessage = undefined;
        // }, 10000)
      },
      error: (error) => {
        this.isloading = false
        console.error(error);

      }

    })
  }
  scrollto(ele: any) {
    ele?.scrollIntoView();
    console.log('working');

  }

  DonationPage() {
    this.router.navigateByUrl("donations")
  }

  isCheckboxenabled(event: any) {
    // console.log(event);
    let isChecked = event.target.checked;
    if (isChecked == false) {
      this.disabledAgreement = false;
    } else {
      this.disabledAgreement = true;
    }
  }

}
