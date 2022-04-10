import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiestnostStrankaComponent } from './miestnost-stranka.component';

describe('MiestnostStrankaComponent', () => {
  let component: MiestnostStrankaComponent;
  let fixture: ComponentFixture<MiestnostStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiestnostStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiestnostStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
