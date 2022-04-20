import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcitelDeleteComponent } from './ucitel-delete.component';

describe('UcitelDeleteComponent', () => {
  let component: UcitelDeleteComponent;
  let fixture: ComponentFixture<UcitelDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcitelDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcitelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
