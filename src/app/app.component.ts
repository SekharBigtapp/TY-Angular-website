import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  event : any;

  @HostListener('window:unload', [ '$event' ])
  unloadHandler($event: Event) {
    console.log("document.visibilityState === 'hidden1'");
    localStorage.setItem("Key", "Value1");
    return false;
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event: Event) {
    console.log("document.visibilityState === 'hidden2'");
    event.preventDefault();
    //event.returnValue = 'Your data will be lost!';
    return false;
  }

  @HostListener('document:visibilitychange', ['$event']) 
  visibilityChange(event: Event) {
    debugger;
    event.preventDefault();
    if (document.visibilityState === 'hidden') {
      console.log("document.visibilityState === 'hidden3'")
      debugger;
      return false;
    }
    return true;
  }

  constructor() { /* TODO document why this constructor is empty */  }

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


