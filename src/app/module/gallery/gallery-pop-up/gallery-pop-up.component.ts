import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery-pop-up',
  templateUrl: './gallery-pop-up.component.html',
  styleUrls: ['./gallery-pop-up.component.css']
})
export class GalleryPopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  modalData: any;
  selectedImgSrc: string="";
  selectedSecImgArray: any;
  flag: String= "";
  titleTxt: string ="";
  ngOnInit() {
    this.modalData = this.data;
    this.selectedImgSrc = this.modalData.targetImgSrc;
    this.selectedSecImgArray = this.modalData.imgArray;
    this.titleTxt = this.modalData.title;
    this.flag = this.modalData.flag;
    console.log(this.data);
  }
}
