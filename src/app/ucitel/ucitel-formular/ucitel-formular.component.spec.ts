import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcitelFormularComponent } from './ucitel-formular.component';

describe('UcitelFormularComponent', () => {
  let component: UcitelFormularComponent;
  let fixture: ComponentFixture<UcitelFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcitelFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcitelFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
