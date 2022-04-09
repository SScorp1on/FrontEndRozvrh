import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozvrhComponent } from './rozvrh.component';

describe('RozvrhComponent', () => {
  let component: RozvrhComponent;
  let fixture: ComponentFixture<RozvrhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RozvrhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RozvrhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
