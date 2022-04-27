import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TimeblockService} from "../../services/timeblock.service";
import {TimeblockModel} from "../../models/timeblock.model";

import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-timeblock-detail',
  templateUrl: './timeblock-detail.component.html',
  styleUrls: ['./timeblock-detail.component.css']
})
export class TimeblockDetailComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  timeblocks: TimeblockModel[] = []
  value = ''


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: TimeblockService,
    public mainService: MainService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TimeblockDetailComponent>
  ) {


  }

  ngOnInit(): void {
    this.mainService.getAllObjects()
    console.log(this.data)

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  form: FormGroup = new FormGroup({
    day: new FormControl(this.data.day, Validators.required),
    start: new FormControl(this.data.start),
    finish: new FormControl(this.data.finish),
    group: new FormControl(this.data.group),
    subject: new FormControl(this.data.subject),
    teacher: new FormControl(this.data.teacher),
    classroom: new FormControl(this.data.classroom)
  })

  initializeFormGroup() {
    this.form.setValue({
      day: this.data.day,
      start: this.data.start,
      finish: this.data.finish,
      group: this.data.group,
      subject: this.data.subject,
      teacher: this.data.teacher,
      classroom: this.data.classroom
    })

  }
  onSubmit() {
    console.log(this.form.value, this.data.id)
    this.service.updateTimeblock(this.data.id , this.form.value).pipe(takeUntil(this.destroy$)).subscribe(timeblock =>{
      this.timeblocks.push(this.form.value)
    });
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success('Rozvrh bol pridan do zoznamu');
    this.onClose();

  }

  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

}
