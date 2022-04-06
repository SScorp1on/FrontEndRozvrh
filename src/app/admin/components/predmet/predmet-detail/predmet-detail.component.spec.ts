import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetDetailComponent } from './predmet-detail.component';

describe('PredmetDetailComponent', () => {
  let component: PredmetDetailComponent;
  let fixture: ComponentFixture<PredmetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
