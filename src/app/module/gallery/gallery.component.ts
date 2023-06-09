import { Component, OnInit, HostListener } from '@angular/core';
import { GalleryPopUpComponent } from './gallery-pop-up/gallery-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  isShow: boolean = true;
  topPosToStartShowing = 300;
  windowScrolled: boolean | undefined;
  albumListArray: any;
  totalRecords: number = 0;
  activePage: number = 1;

  gallary10ImageSrc: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg", "gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];
  gallary10ImageTitle: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10", "Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry: string[] = [];
  siLastIndex: number = 0;
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
  siLastIndex2: number = 0;
  img20IdArray = ["gallery20", "gallery21", "gallery22", "gallery23"];

  disabledAgreement: boolean = false;


  gallary10ImageSrc3: string[] = ["gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg", "gallery-secimg1.jpg", "gallery-secimg2.jpg", "gallery-secimg3.jpg", "gallery-secimg4.jpg", "gallery-secimg5.jpg",
    "gallery-secimg6.jpg", "gallery-secimg7.jpg", "gallery-secimg8.jpg", "gallery-secimg9.jpg", "gallery-secimg10.jpg"];

  gallary10ImageTitle3: string[] = ["Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10", "Gallery-secimg01", "Gallery-secimg2", "Gallery-secimg3", "Gallery-secimg4", "Gallery-secimg5",
    "Gallery-secimg6", "Gallery-secimg7", "Gallery-secimg8", "Gallery-secimg", "Gallery-secimg10"];
  currentImgArry3: string[] = [];
  siLastIndex3: number = 0;
  img30IdArray = ["gallery30", "gallery31", "gallery32"];

  title = 'ng-bootstrap-modal-demo';
  closeResult: string = "";
  modalOptions: NgbModalOptions;
  public popupSampleData: any = {
    flag: '1',
    imageTitle: "Sample Image Name",
    selectedImgSrc: "assets/img/gallery-no-img.png"
  }

  constructor(public matDialog: MatDialog,
    public http: HttpClient,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private actRoute: ActivatedRoute) {
    this.actRoute.queryParams.subscribe((params: any) => {
      this.activePage = params['page'];
    });
    if (this.activePage == undefined) {
      this.activePage = 1;
    }
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
    console.log("ID: ", this.activePage);
  }

  async ngOnInit(): Promise<void> {
    $('.mobile-nav-toggle').on('click', function (e) {
      $('.mobile-nav-toggle').toggleClass("bi-x");
      $("#navbar").toggleClass("navbar-mobile");
      e.preventDefault();

    });
    
    await this.getAlbumImages();
  }

  async getAlbumImages() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      "pageIndex": this.activePage
    }
    this.http.post<any>(environment.url + "yogaAdmin/webSite/galleries", body, { headers: header }).subscribe({
      next: (data : any) => {
        this.albumListArray = data;
        this.totalRecords = this.albumListArray.albumCount;
        this.nextImagesAPI();
        this.nextImagesSecAPI2();
        this.nextImagesSecAPI3();
        console.log("🚀 ~ file: gallery.component.ts:97 ~ GalleryComponent ~ getAlbumInages ~ data:", data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  async displayActivePage(activePageNumber: any) {
    if (this.activePage == activePageNumber) {
      return false;
    }
    this.activePage = activePageNumber;
    console.log("This is active page after change");
    this.siLastIndex = 0;
    this.siLastIndex2 = 0;
    this.siLastIndex3 = 0;

    this.nextEnabled1 = true;
    this.nextEnabled2 = true;
    this.nextEnabled3 = true;

    await this.getAlbumImages();
    this.gotoTop();
    return true;
  }

  nextImagesAPI() {
    //debugger;
    let startIndx = this.siLastIndex * 5;
    let lastIndx = startIndx + 5;
    let ciIdx = 0;
    let sectionIndex = 0;
    let albumTitle = (this.albumListArray.albums[sectionIndex]) ? this.albumListArray.albums[sectionIndex].galleryName : ''
    $("#gallerytitle1-desc, #gallerytitle1-mob").html(albumTitle);
    setTimeout(() => {
      for (let i = startIndx; i < lastIndx; i++) {
        //this.currentImgArry[ciIdx] = "assets/img/" + this.gallary10ImageSrc[i];
        if (this.albumListArray.albums[sectionIndex].no_of_photo[i]) {
          let thumbimage = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.thumbnail_image;
          let media_path = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_path;
          let media_description = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_description;
          let galleryCategoryId = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.gallery_category;
          if (thumbimage.indexOf("fileUrl") > -1) {
            thumbimage = JSON.parse(thumbimage);
            thumbimage = thumbimage.fileUrl;
          }
          if (media_path.indexOf("fileUrl") > -1) {
            media_path = JSON.parse(media_path);
            media_path = media_path.fileUrl;
          }
          console.log("Thumb Image ", thumbimage);
          this.currentImgArry[ciIdx] = thumbimage;
          let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
          imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
          imgObject?.setAttribute("alt", media_description);
          imgObject?.setAttribute("data-main-src", media_path);
          imgObject?.setAttribute("data-flag", galleryCategoryId);
          $("#"+this.img10IdArray[ciIdx]).parent().removeClass('video-icon');
          if(galleryCategoryId==2){
            $("#"+this.img10IdArray[ciIdx]).parent().addClass('video-icon');
          }
        } else {
          this.currentImgArry[ciIdx] = "assets/img/gallery-no-img.png";
          let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
          imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
          imgObject?.setAttribute("alt", "no-image");
          imgObject?.setAttribute("data-main-src", this.currentImgArry[ciIdx]);
          imgObject?.setAttribute("data-flag", "1")
        }
        ciIdx++;
      }
    }, 300);
    if (this.siLastIndex * 5 < this.albumListArray.albums[sectionIndex].no_of_photo.length) {
      this.siLastIndex++;
    }

    if (this.siLastIndex * 5 >= this.albumListArray.albums[sectionIndex].no_of_photo.length) {
      this.nextEnabled1 = false
    }
  }

  prevImagesAPI() {
    //debugger
    let startIndx = ((this.siLastIndex - 1) * 5) - 5;
    let lastIndx = startIndx + 5;
    let ciIdx = 0;
    let sectionIndex = 0;
    for (let i = startIndx; i < lastIndx; i++) {
      let thumbimage = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.thumbnail_image;
      let media_path = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_path;
      let media_description = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_description;
      let galleryCategoryId = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.gallery_category;
      if (thumbimage.indexOf("fileUrl") > -1) {
        thumbimage = JSON.parse(thumbimage);
        thumbimage = thumbimage.fileUrl;
      }
      if (media_path.indexOf("fileUrl") > -1) {
        media_path = JSON.parse(media_path);
        media_path = media_path.fileUrl;
      }
      console.log("Thumb Image ", thumbimage);
      this.currentImgArry[ciIdx] = thumbimage;
      let imgObject = document.getElementById(this.img10IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry[ciIdx]);
      imgObject?.setAttribute("alt", media_description);
      imgObject?.setAttribute("data-main-src", media_path);
      imgObject?.setAttribute("data-flag", galleryCategoryId);
      $("#"+this.img10IdArray[ciIdx]).parent().removeClass('video-icon');
      if(galleryCategoryId==2){
        $("#"+this.img10IdArray[ciIdx]).parent().addClass('video-icon');
      }
      ciIdx++;
    }
    if (this.siLastIndex > 0) {
      this.siLastIndex--;
      this.nextEnabled1 = true;
    }
  }

  nextImagesSecAPI2() {
    let startIndx = this.siLastIndex2 * 4;
    let lastIndx = startIndx + 4;
    let ciIdx = 0;
    let sectionIndex = 1;
    let albumTitle = (this.albumListArray.albums[sectionIndex]) ? this.albumListArray.albums[sectionIndex].galleryName : ''
    $("#gallerytitle2-desc, #gallerytitle2-mob").html(albumTitle);
    for (let i = startIndx; i < lastIndx; i++) {
      if (this.albumListArray.albums[sectionIndex].no_of_photo[i]) {
        let thumbimage = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.thumbnail_image;
        let media_path = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_path;
        let media_description = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_description;
        let galleryCategoryId = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.gallery_category;
        if (thumbimage.indexOf("fileUrl") > -1) {
          thumbimage = JSON.parse(thumbimage);
          thumbimage = thumbimage.fileUrl;
        }
        if (media_path.indexOf("fileUrl") > -1) {
          media_path = JSON.parse(media_path);
          media_path = media_path.fileUrl;
        }
        console.log("Thumb Image 2", thumbimage);
        this.currentImgArry2[ciIdx] = thumbimage;
        let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
        imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
        imgObject?.setAttribute("alt", media_description);
        imgObject?.setAttribute("data-main-src", media_path);
        imgObject?.setAttribute("data-flag", galleryCategoryId);
        $("#"+this.img20IdArray[ciIdx]).parent().removeClass('video-icon');
        if(galleryCategoryId==2){
          $("#"+this.img20IdArray[ciIdx]).parent().addClass('video-icon');
        }

      } else {
        this.currentImgArry2[ciIdx] = "assets/img/gallery-no-img.png";
        let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
        imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
        imgObject?.setAttribute("alt", "no-image");
        imgObject?.setAttribute("data-main-src", this.currentImgArry2[ciIdx]);
        imgObject?.setAttribute("data-flag", "1");
      }
      ciIdx++;
    }
    if (this.siLastIndex2 * 4 < this.albumListArray.albums[sectionIndex].no_of_photo.length) {
      this.siLastIndex2++;
    }
    if (this.siLastIndex2 * 4 >= this.albumListArray.albums[sectionIndex].no_of_photo.length) {
      this.nextEnabled2 = false;
    }
  }

  prevImagesSecAPI2() {
    //debugger;
    let startIndx = ((this.siLastIndex2 - 1) * 4) - 4;
    let lastIndx = startIndx + 4;
    let ciIdx = 0;
    let sectionIndex = 1;
    for (let i = startIndx; i < lastIndx; i++) {
      let thumbimage = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.thumbnail_image;
      let media_path = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_path;
      let media_description = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_description;
      let galleryCategoryId = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.gallery_category;
      if (thumbimage.indexOf("fileUrl") > -1) {
        thumbimage = JSON.parse(thumbimage);
        thumbimage = thumbimage.fileUrl;
      }
      if (media_path.indexOf("fileUrl") > -1) {
        media_path = JSON.parse(media_path);
        media_path = media_path.fileUrl;
      }
      console.log("Thumb Image 2", thumbimage);
      this.currentImgArry2[ciIdx] = thumbimage;
      let imgObject = document.getElementById(this.img20IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry2[ciIdx]);
      imgObject?.setAttribute("alt", media_description);
      imgObject?.setAttribute("data-main-src", media_path);
      imgObject?.setAttribute("data-flag", galleryCategoryId);
      $("#"+this.img20IdArray[ciIdx]).parent().removeClass('video-icon');
      if(galleryCategoryId==2){
        $("#"+this.img20IdArray[ciIdx]).parent().addClass('video-icon');
      }
      ciIdx++;
    }
    if (this.siLastIndex2 > 0) {
      this.siLastIndex2--;
      this.nextEnabled2 = true;
    }
  }

  nextImagesSecAPI3() {
    //debugger
    let startIndx = this.siLastIndex3 * 3;
    let lastIndx = startIndx + 3;
    let ciIdx = 0;
    let sectionIndex = 2;
    let albumTitle = (this.albumListArray.albums[sectionIndex]) ? this.albumListArray.albums[sectionIndex].galleryName : ''
    $("#gallerytitle3-desc, #gallerytitle3-mob").html(albumTitle);
    for (let i = startIndx; i < lastIndx; i++) {
      if (this.albumListArray.albums[sectionIndex].no_of_photo[i]) {
        let thumbimage = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.thumbnail_image;
        let media_path = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_path;
        let media_description = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_description;
        let galleryCategoryId = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.gallery_category;
        if (thumbimage.indexOf("fileUrl") > -1) {
          thumbimage = JSON.parse(thumbimage);
          thumbimage = thumbimage.fileUrl;
        }
        if (media_path.indexOf("fileUrl") > -1) {
          media_path = JSON.parse(media_path);
          media_path = media_path.fileUrl;
        }
        console.log("Thumb Image 2", thumbimage);
        this.currentImgArry3[ciIdx] = thumbimage;
        let imgObject = document.getElementById(this.img30IdArray[ciIdx]);
        imgObject?.setAttribute("src", this.currentImgArry3[ciIdx]);
        imgObject?.setAttribute("alt", media_description);
        imgObject?.setAttribute("data-main-src", media_path);
        imgObject?.setAttribute("data-flag", galleryCategoryId);
        $("#"+this.img30IdArray[ciIdx]).parent().removeClass('video-icon');
        if(galleryCategoryId==2){
          $("#"+this.img30IdArray[ciIdx]).parent().addClass('video-icon');
        }
      } else {
        this.currentImgArry3[ciIdx] = "assets/img/gallery-no-img.png";
        let imgObject = document.getElementById(this.img30IdArray[ciIdx]);
        imgObject?.setAttribute("src", this.currentImgArry3[ciIdx]);
        imgObject?.setAttribute("alt", "no-image");
        imgObject?.setAttribute("data-main-src", this.currentImgArry3[ciIdx]);
        imgObject?.setAttribute("data-flag", "1");
      }
      ciIdx++;
    }
    if (this.siLastIndex3 * 3 < this.albumListArray.albums[sectionIndex].no_of_photo.length) {
      this.siLastIndex3++;
    }
    if (this.siLastIndex3 * 3 >= this.albumListArray.albums[sectionIndex].no_of_photo.length) {
      this.nextEnabled3 = false;
    }
  }

  prevImagesSecAPI3() {
    //debugger;
    let startIndx = ((this.siLastIndex3 - 1) * 3) - 3;
    let lastIndx = startIndx + 3;
    let ciIdx = 0;
    let sectionIndex = 2;
    for (let i = startIndx; i < lastIndx; i++) {
      let thumbimage = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.thumbnail_image;
      let media_path = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_path;
      let media_description = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.media_description;
      let galleryCategoryId = this.albumListArray.albums[sectionIndex].no_of_photo[i]?.gallery_category;
      if (thumbimage.indexOf("fileUrl") > -1) {
        thumbimage = JSON.parse(thumbimage);
        thumbimage = thumbimage.fileUrl;
      }
      if (media_path.indexOf("fileUrl") > -1) {
        media_path = JSON.parse(media_path);
        media_path = media_path.fileUrl;
      }
      console.log("Thumb Image 2", thumbimage);
      this.currentImgArry3[ciIdx] = thumbimage;
      let imgObject = document.getElementById(this.img30IdArray[ciIdx]);
      imgObject?.setAttribute("src", this.currentImgArry3[ciIdx]);
      imgObject?.setAttribute("alt", media_description);
      imgObject?.setAttribute("data-main-src", media_path);
      imgObject?.setAttribute("data-flag", galleryCategoryId);
      $("#"+this.img30IdArray[ciIdx]).parent().removeClass('video-icon');
      if(galleryCategoryId==2){
        $("#"+this.img30IdArray[ciIdx]).parent().addClass('video-icon');
      }
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
    //debugger
    let element = event.target || event.srcElement || event.currentTarget;
    let titleTxt = element.alt;
    let clickedIdx = 0;


    this.matDialog.open(GalleryPopUpComponent, {
      width: 'auto', height: 'auto',
      data: {
        title: titleTxt,
        targetImgSrc: element.dataset.mainSrc,
        imgIndex: clickedIdx,
        flag: element.dataset.flag,
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


  async openSamplePopup(event: any, content: any) {
    console.log("Openened Popup");
    let imageSource = event.target || event.srcElement || event.currentTarget;
    let imageflag = imageSource.dataset.flag
    let ImageTitle = imageSource.alt;
    this.popupSampleData = {
      flag: imageflag,
      imageTitle: ImageTitle,
      selectedImgSrc: imageSource.dataset.mainSrc
    }

    this.modalService.open(content, { windowClass: 'gallery-popup-block', size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Dismissed Popup");
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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

