import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryPopUpComponent } from './gallery-pop-up/gallery-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  isShow: boolean = true;
  topPosToStartShowing = 300;
  windowScrolled: boolean | undefined;

  gallarySide1 = [
    { id: 1, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg1.jpg', title: 'Title 1', description: 'Description 1' },
    { id: 2, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg2.jpg', title: 'Title 2', description: 'Description 2' },
    { id: 3, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg3.jpg', title: 'Title 3', description: 'Description 3' },
    { id: 4, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg4.jpg', title: 'Title 4', description: 'Description 4' },
    { id: 5, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg5.jpg', title: 'Title 5', description: 'Description 5' },
    { id: 6, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg6.jpg', title: 'Title 6', description: 'Description 6' },
    { id: 7, mediaType: "image" ,mediaUrl: 'assets/img/gallery-secimg7.jpg', title: 'Title 7', description: 'Description 7' },
    { id: 8, mediaType: "video" ,mediaUrl: 'https://traditionalyoga-app-staging.s3.ap-south-1.amazonaws.com/Testimonial_videos140423/FINAL+-+Anita+Kumari+I+Physiotherapist+-+Made+with+Clipchamp.mp4', title: 'Title 8', description: 'Description 8' }
  ];

  carouselConfig = {
    method: {},
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  getCarouselItemClass(index: number): string {
    const classNames = ['glary-img-main col-md-6', 'glary-img col-md-3', 'glary-img1 col-md-3', 'glary-img1 col-md-3', 'glary-img1 col-md-3'];
    // console.log(classNames[index % classNames.length]);
    return classNames[index % classNames.length];
  }
  

  gallaryClass = {

  }

  gallary10ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg", "gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  gallary10ImageTitle: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10", "Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry: string[] = [];
  siLastIndex: number = 1;
  nextEnabled1: boolean = true;
  nextEnabled2: boolean = true;
  nextEnabled3: boolean = true;
  img10IdArray = ["gallery10", "gallery11", "gallery12", "gallery13", "gallery14"];

  gallary20ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg", "gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  gallary20ImageTitle: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10", "Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry2: string[] = [];
  siLastIndex2: number = 1;
  img20IdArray = ["gallery20", "gallery21", "gallery22", "gallery23"];

  disabledAgreement: boolean = false;


  gallary10ImageSrc3: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg", "gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];

  gallary10ImageTitle3: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10", "Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry3: string[] = [];
  siLastIndex3: number = 1;
  img30IdArray = ["gallery30", "gallery31", "gallery32"];

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
    $('.mobile-nav-toggle').click(function (e) {
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();

    });
  }

  nextImages() {
    // debugger
    let startIndx = this.siLastIndex * 5;
    let lastIndx = startIndx + 5;
    let ciIdx = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      this.currentImgArry[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
      let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
      ciIdx++;
    }
    if (this.siLastIndex * 5 < this.gallary10ImageSrc.length) {
      this.siLastIndex++;
    }

    if (this.siLastIndex * 5 >= this.gallary10ImageSrc.length) {
      this.nextEnabled1 = false
    }
  }

  prevImages() {
    // debugger
    let startIndx = ((this.siLastIndex - 1) * 5) - 5;
    let lastIndx = startIndx + 5;
    let ciIdx = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      this.currentImgArry[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
      let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
      ciIdx++;
    }
    if (this.siLastIndex > 0) {
      this.siLastIndex--;
      this.nextEnabled1 = true;
    }
  }

  nextImagesSec2() {

    let startIndx = this.siLastIndex2 * 4;
    let lastIndx = startIndx + 4;
    let ciIdx = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      this.currentImgArry2[ciIdx] = "assets/img/" + this.gallary20ImageSrc[i];
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      ciIdx++;
    }
    if (this.siLastIndex2 * 4 < this.gallary20ImageSrc.length) {
      this.siLastIndex2++;
    }

    if (this.siLastIndex2 * 4 >= this.gallary20ImageSrc.length) {
      this.nextEnabled2 = false;
    }
  }

  prevImagesSec2() {

    let startIndx = ((this.siLastIndex2 - 1) * 4) - 5;
    let lastIndx = startIndx + 5;
    let ciIdx = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      this.currentImgArry2[ciIdx] = "assets/img/" + this.gallary20ImageSrc[i];
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      ciIdx++;
    }
    if (this.siLastIndex2 > 0) {
      this.siLastIndex2--;
      this.nextEnabled2 = true;
    }
  }

  nextImages3() {
    // debugger
    let startIndx = this.siLastIndex3 * 4;
    let lastIndx = startIndx + 4;
    let ciIdx = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      this.currentImgArry3[ciIdx] = "assets/img/" + this.gallary10ImageSrc3[i];
      let imgObject = document.getElementById(this.img30IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry3[ciIdx]);
      ciIdx++;
    }
    if (this.siLastIndex3 * 4 < this.gallary10ImageSrc3.length) {
      this.siLastIndex3++;
    }
    if (this.siLastIndex3 * 4 >= this.gallary10ImageSrc3.length) {

      this.nextEnabled3 = false;
    }
  }

  prevImages3() {
    // debugger
    let startIndx = ((this.siLastIndex3 - 1) * 4) - 5;
    let lastIndx = startIndx + 5;
    let ciIdx = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      this.currentImgArry3[ciIdx] = "assets/img/" + this.gallary10ImageSrc3[i];
      let imgObject = document.getElementById(this.img30IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry3[ciIdx]);
      ciIdx++;
    }
    if (this.siLastIndex3 > 0) {
      this.siLastIndex3--;
      this.nextEnabled3 = true;
    }
  }

  isCheckboxenabled(event: any) {
    console.log(event);
    let isChecked = event.target.checked;
    if (isChecked == false) {
      this.disabledAgreement = false;
    } else {
      this.disabledAgreement = true;
    }
  }

  openPopup(event: any, sIdnx: number) {
    // debugger
    let element = event.target || event.srcElement || event.currentTarget;
    let clickedElementSrc = element.src;
    let titleTxt = "";
    let clickedIdx = 0;
    let titleIndx = 0;
    let imagesArray = this.gallary10ImageSrc;
    let imagesTitleArray = this.gallary10ImageTitle;
    // alert(sIdnx);
    if (sIdnx == 2) {
      imagesArray = this.gallary20ImageSrc;
      imagesTitleArray = this.gallary20ImageTitle;
    }
    for (let i = 0; i < imagesArray.length; i++) {
      if (clickedElementSrc.indexOf(imagesArray[i]) != -1) {
        clickedIdx = i;
        titleIndx = i;
        titleTxt = imagesTitleArray[titleIndx];
        continue;
      }
    }

    this.matDialog.open(GalleryPopUpComponent, {
      width: 'auto', height: 'auto',
      data: {
        title: titleTxt,
        targetImgSrc: element.src,
        imgIndex: clickedIdx,
        imgArray: imagesArray
      },
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '200ms'
    });
  }



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


}

