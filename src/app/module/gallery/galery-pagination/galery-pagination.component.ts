import { Component , Input , OnChanges , Output , EventEmitter} from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-galery-pagination',
  templateUrl: './galery-pagination.component.html',
  styleUrls: ['./galery-pagination.component.css']
})
export class GaleryPaginationComponent implements OnChanges {

  @Input() totalRecords = 0;  
    @Input() recordsPerPage = 0;  
  
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();  
  
    public pages: number [] = [];  
    activePage: number = 1; 

    constructor(public router: Router) { }

    ngOnChanges(): any {  
      const pageCount = this.getPageCount();  
      this.pages = this.getArrayOfPage(pageCount);  
      this.activePage = 1;  
      this.onPageChange.emit(1);  
    }  
  
    private  getPageCount(): number {  
      let totalPage = 0;  
  
      if (this.totalRecords > 0 && this.recordsPerPage > 0) {  
        const pageCount = this.totalRecords / this.recordsPerPage;  
        const roundedPageCount = Math.floor(pageCount);  
  
        totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
      }  
  
      return totalPage;  
    }  
  
    private getArrayOfPage(pageCount: number): number [] {  
      const pageArray = [];  
  
      if (pageCount > 0) {  
          for(let i = 1 ; i <= pageCount ; i++) {  
            pageArray.push(i);  
          }  
      }  
  
      return pageArray;  
    }  
  
    onClickPage(pageNumber: number): void {  
      //this.router.navigate(['/gallery'], {  queryParams: {  page: pageNumber } })
      if (pageNumber >= 1 && pageNumber <= this.pages.length) {  
          this.activePage = pageNumber;  
          this.onPageChange.emit(this.activePage);  
      }  
      this.router.navigate(['/gallery'], {  queryParams: {  page: pageNumber } })
    }  

}
