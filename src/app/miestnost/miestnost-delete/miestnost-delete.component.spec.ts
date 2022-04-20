import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiestnostDeleteComponent } from './miestnost-delete.component';

describe('MiestnostDeleteComponent', () => {
  let component: MiestnostDeleteComponent;
  let fixture: ComponentFixture<MiestnostDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiestnostDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiestnostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
