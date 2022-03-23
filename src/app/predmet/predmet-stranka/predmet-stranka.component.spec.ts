import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetStrankaComponent } from './predmet-stranka.component';

describe('PredmetStrankaComponent', () => {
  let component: PredmetStrankaComponent;
  let fixture: ComponentFixture<PredmetStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
