import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-courses',
  templateUrl: './upcoming-courses.component.html',
  styleUrls: ['./upcoming-courses.component.css']
})
export class UpcomingCoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
    });
  }
}
