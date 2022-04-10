import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcitelZoznamComponent } from './ucitel-zoznam.component';

describe('UcitelZoznamComponent', () => {
  let component: UcitelZoznamComponent;
  let fixture: ComponentFixture<UcitelZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcitelZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcitelZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
