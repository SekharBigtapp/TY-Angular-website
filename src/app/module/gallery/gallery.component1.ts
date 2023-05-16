import { Component, OnInit } from '@angular/core';
import { GalleryPopUpComponent } from './gallery-pop-up/gallery-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  gallary10ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
  "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg","gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
  "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  gallary10ImageTitle: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
  "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10","Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
  "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry: string[] = [];
  siLastIndex: number = 1;
  nextEnabled1:boolean = true;
  nextEnabled2:boolean = true;
  siLastIndex3: number = 1;
  img10IdArray = ["gallery10", "gallery11", "gallery12", "gallery13", "gallery14"];

  gallary20ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
  "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg","gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
  "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  gallary20ImageTitle: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
  "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10","Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
  "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry2: string[] = [];
  siLastIndex2: number = 1;
  img20IdArray = ["gallery20", "gallery21", "gallery22", "gallery23"];

  disabledAgreement: boolean = false;

 

  constructor(public matDialog: MatDialog) { }

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

    if(this.siLastIndex*5 >= this.gallary10ImageSrc.length){
      this.nextEnabled1 =false
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
      this.nextEnabled1=true;
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

    if(this.siLastIndex2*4 >= this.gallary20ImageSrc.length){
      this.nextEnabled2=false;
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
      this.nextEnabled2=true;
    }
  }

  nextImages3() {
    debugger
    let startIndx = this.siLastIndex3 * 4;
    let lastIndx = startIndx+4;
    let ciIdx = 0;
    for(let i=startIndx; i<lastIndx; i++){
      this.currentImgArry2[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      ciIdx++;
    }
    if(this.siLastIndex3*4 < this.gallary20ImageSrc.length){
      this.siLastIndex3++;
    }
  }

  prevImages3() {
    debugger
    let startIndx = ((this.siLastIndex3-1) * 4) -5;
    let lastIndx = startIndx+5;
    let ciIdx = 0;
    for(let i=startIndx; i<lastIndx; i++){
      this.currentImgArry2[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      ciIdx++;
    }
    if(this.siLastIndex3>0){
      this.siLastIndex3--;
    }
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

  openPopup(event:any, sIdnx:number){
    debugger
    let element = event.target || event.srcElement || event.currentTarget;
    let clickedElementSrc = element.src;
    let titleTxt = "" ;
    let clickedIdx = 0;
    let titleIndx=0;
    let imagesArray=this.gallary10ImageSrc;
    let imagesTitleArray = this.gallary10ImageTitle;
    // alert(sIdnx);
    if(sIdnx == 2){
      imagesArray=this.gallary20ImageSrc;
      imagesTitleArray = this.gallary20ImageTitle;
    }
    for(let i=0; i<imagesArray.length; i++){
      if(clickedElementSrc.indexOf(imagesArray[i])!=-1){
        clickedIdx = i;
        titleIndx = i;
        titleTxt = imagesTitleArray[titleIndx];
        continue;
      }
    }
    
    this.matDialog.open(GalleryPopUpComponent, {width:'auto', height:'auto',
    data:{
      title:titleTxt,
      targetImgSrc: element.src,
      imgIndex: clickedIdx,
      imgArray: imagesArray
      },
      enterAnimationDuration:'100ms',
      exitAnimationDuration: '200ms'
    });
  }
}

