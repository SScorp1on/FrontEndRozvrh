import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetFormularComponent } from './predmet-formular.component';

describe('PredmetFormularComponent', () => {
  let component: PredmetFormularComponent;
  let fixture: ComponentFixture<PredmetFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
