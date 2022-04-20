import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozvrhDetailComponent } from './rozvrh-detail.component';

describe('RozvrhDetailComponent', () => {
  let component: RozvrhDetailComponent;
  let fixture: ComponentFixture<RozvrhDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RozvrhDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RozvrhDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
