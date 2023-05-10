import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  gallary10ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
  "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  currentImgArry: string[] = [];
  siLastIndex: number = 1;
  img10IdArray = ["gallery10", "gallery11", "gallery12", "gallery13", "gallery14"];

  gallary20ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
  "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  currentImgArry2: string[] = [];
  siLastIndex2: number = 1;
  img20IdArray = ["gallery20", "gallery21", "gallery22", "gallery23"];

  constructor() { }

  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function(e){
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();
     
    });
  }

  nextImages() {
    debugger
    let startIndx = this.siLastIndex * 5;
    let lastIndx = startIndx+5;
    let ciIdx = 0;
    for(let i=startIndx; i<lastIndx; i++){
      this.currentImgArry[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
      let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
      ciIdx++;
    }
    if(this.siLastIndex*5 < this.gallary10ImageSrc.length){
      this.siLastIndex++;
    }
  }

  prevImages() {
    debugger
    let startIndx = ((this.siLastIndex-1) * 5) -5;
    let lastIndx = startIndx+5;
    let ciIdx = 0;
    for(let i=startIndx; i<lastIndx; i++){
      this.currentImgArry[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
      let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
      ciIdx++;
    }
    if(this.siLastIndex>0){
      this.siLastIndex--;
    }
  }

  nextImagesSec2() {
    debugger
    let startIndx = this.siLastIndex2 * 4;
    let lastIndx = startIndx+4;
    let ciIdx = 0;
    for(let i=startIndx; i<lastIndx; i++){
      this.currentImgArry2[ciIdx] = "assets/img/" + this.gallary20ImageSrc[i];
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      ciIdx++;
    }
    if(this.siLastIndex2*4 < this.gallary20ImageSrc.length){
      this.siLastIndex2++;
    }
  }

  prevImagesSec2() {
    debugger
    let startIndx = ((this.siLastIndex2-1) * 4) -5;
    let lastIndx = startIndx+5;
    let ciIdx = 0;
    for(let i=startIndx; i<lastIndx; i++){
      this.currentImgArry2[ciIdx] = "assets/img/" + this.gallary20ImageSrc[i];
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      ciIdx++;
    }
    if(this.siLastIndex2>0){
      this.siLastIndex2--;
    }
  }
}

