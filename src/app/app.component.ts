import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  event : any;
  constructor() { }

  ngOnInit(): void {
    $(document).on('ready', function() {
      $('.mobile-nav-toggle').click(function(e){
        $('.mobile-nav-toggle').toggleClass("bi-x");
        $("#navbar").toggleClass("navbar-mobile");
        e.preventDefault();
      });
    });
  }

  title = 'TraditionalYogaWebsite';

 

}


