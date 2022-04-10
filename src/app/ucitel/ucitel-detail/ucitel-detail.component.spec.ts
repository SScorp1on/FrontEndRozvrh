import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcitelDetailComponent } from './ucitel-detail.component';

describe('UcitelDetailComponent', () => {
  let component: UcitelDetailComponent;
  let fixture: ComponentFixture<UcitelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcitelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcitelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
