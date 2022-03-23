import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcitelStrankaComponent } from './ucitel-stranka.component';

describe('UcitelStrankaComponent', () => {
  let component: UcitelStrankaComponent;
  let fixture: ComponentFixture<UcitelStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcitelStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcitelStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
