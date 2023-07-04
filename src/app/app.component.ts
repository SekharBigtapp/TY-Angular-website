import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  event : any;
  // @HostListener('window:beforeunload')
  // onBeforeUnload() {
  //   return false;
  // }


  ngOnInit(): void {
    // document.onclick = (args: any): void => {
    //   //alert();
    //   let currentTarget = args.target.closest('nav');
    //   if (currentTarget == null) {
    //     console.log("Called");
    //     $('.mobile-nav-toggle').removeClass("bi-x");
    //     $("#navbar").removeClass("navbar-mobile");
    //   }
    // }


    $(document).on('ready', function() {
      $('.mobile-nav-toggle').on('click', function(e){
        $('.mobile-nav-toggle').toggleClass("bi-x");
        $("#navbar").toggleClass("navbar-mobile");
        e.preventDefault();
      });
    });
  }

  title = 'TraditionalYogaWebsite';

}


