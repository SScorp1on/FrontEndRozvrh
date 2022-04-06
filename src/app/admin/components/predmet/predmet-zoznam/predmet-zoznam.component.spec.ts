import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetZoznamComponent } from './predmet-zoznam.component';

describe('PredmetZoznamComponent', () => {
  let component: PredmetZoznamComponent;
  let fixture: ComponentFixture<PredmetZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
