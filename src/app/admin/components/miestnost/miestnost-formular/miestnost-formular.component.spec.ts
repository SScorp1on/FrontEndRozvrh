import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiestnostFormularComponent } from './miestnost-formular.component';

describe('MiestnostFormularComponent', () => {
  let component: MiestnostFormularComponent;
  let fixture: ComponentFixture<MiestnostFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiestnostFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiestnostFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
