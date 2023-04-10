import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedicNeutraceuticlesComponent } from './vedic-neutraceuticles.component';

describe('VedicNeutraceuticlesComponent', () => {
  let component: VedicNeutraceuticlesComponent;
  let fixture: ComponentFixture<VedicNeutraceuticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VedicNeutraceuticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VedicNeutraceuticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
