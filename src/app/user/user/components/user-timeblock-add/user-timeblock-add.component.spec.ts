import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeblockAddComponent } from './user-timeblock-add.component';

describe('UserTimeblockAddComponent', () => {
  let component: UserTimeblockAddComponent;
  let fixture: ComponentFixture<UserTimeblockAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeblockAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimeblockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
