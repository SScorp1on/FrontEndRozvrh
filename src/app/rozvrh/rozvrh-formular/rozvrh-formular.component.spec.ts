import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozvrhFormularComponent } from './rozvrh-formular.component';

describe('RozvrhFormularComponent', () => {
  let component: RozvrhFormularComponent;
  let fixture: ComponentFixture<RozvrhFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RozvrhFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RozvrhFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
