import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryPaginationComponent } from './galery-pagination.component';

describe('GaleryPaginationComponent', () => {
  let component: GaleryPaginationComponent;
  let fixture: ComponentFixture<GaleryPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleryPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
