import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  event : any;


  ngOnInit(): void {
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


