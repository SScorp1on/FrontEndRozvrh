import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozvrhZoznamComponent } from './rozvrh-zoznam.component';

describe('RozvrhZoznamComponent', () => {
  let component: RozvrhZoznamComponent;
  let fixture: ComponentFixture<RozvrhZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RozvrhZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RozvrhZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
