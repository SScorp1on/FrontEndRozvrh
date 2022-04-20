import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetDeleteComponent } from './predmet-delete.component';

describe('PredmetDeleteComponent', () => {
  let component: PredmetDeleteComponent;
  let fixture: ComponentFixture<PredmetDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
