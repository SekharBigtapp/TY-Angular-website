import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPopUpComponent } from './gallery-pop-up.component';

describe('GalleryPopUpComponent', () => {
  let component: GalleryPopUpComponent;
  let fixture: ComponentFixture<GalleryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
