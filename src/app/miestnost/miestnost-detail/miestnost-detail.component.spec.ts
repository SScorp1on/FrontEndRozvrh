import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiestnostDetailComponent } from './miestnost-detail.component';

describe('MiestnostDetailComponent', () => {
  let component: MiestnostDetailComponent;
  let fixture: ComponentFixture<MiestnostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiestnostDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiestnostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
