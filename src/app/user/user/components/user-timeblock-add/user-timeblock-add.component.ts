import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {StepperOrientation} from "@angular/cdk/stepper";
import {MainService} from "../../../../admin-dashboard/components/services/main.service";

@Component({
  selector: 'app-user-timeblock-add',
  templateUrl: './user-timeblock-add.component.html',
  styleUrls: ['./user-timeblock-add.component.css']
})
export class UserTimeblockAddComponent implements OnInit{

  firstFormGroup = this._formBuilder.group({
    group: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public mainService: MainService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit() {
    this.mainService.getAllObjects()
  }
}
