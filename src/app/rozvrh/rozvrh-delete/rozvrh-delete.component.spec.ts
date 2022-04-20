import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozvrhDeleteComponent } from './rozvrh-delete.component';

describe('RozvrhDeleteComponent', () => {
  let component: RozvrhDeleteComponent;
  let fixture: ComponentFixture<RozvrhDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RozvrhDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RozvrhDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
