import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiestnostZoznamComponent } from './miestnost-zoznam.component';

describe('MiestnostZoznamComponent', () => {
  let component: MiestnostZoznamComponent;
  let fixture: ComponentFixture<MiestnostZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiestnostZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiestnostZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
