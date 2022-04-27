import { Component, OnInit } from '@angular/core';
import {TimeblockService} from "../../services/timeblock.service";
import {TeacherService} from "../../services/teacher.service";
import {SubjectService} from "../../services/subject.service";
import {ClassroomService} from "../../services/classroom.service";
import {GroupService} from "../../services/group.service";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {Teacher} from "../../models/teacher";
import {SubjectModel} from "../../models/subject";
import {Classroom} from "../../models/classroom";
import {GroupModel} from "../../models/group.model";
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../services/main.service";
import {TimeblockModel} from "../../models/timeblock.model";
import {Day} from "../../models/day.model";

@Component({
  selector: 'app-timeblock-add',
  templateUrl: './timeblock-add.component.html',
  styleUrls: ['./timeblock-add.component.css']
})
export class TimeblockAddComponent implements OnInit {
  timeblocks: TimeblockModel[] = []
  teachers: Teacher[] = []
  subjects: SubjectModel[] = []
  classrooms: Classroom[] = []
  groups: GroupModel[]  = []
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(

    public service: TimeblockService,
    public mainService: MainService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TimeblockAddComponent>

  ) {

  }
  days = Day
  value = ''
  ngOnInit(): void {
    this.mainService.getAllObjects()
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  form: FormGroup = new FormGroup({
    day: new FormControl(null, Validators.required),
    start: new FormControl(0, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
    finish: new FormControl(0, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
    group: new FormControl(''),
    subject: new FormControl(''),
    teacher: new FormControl(''),
    classroom: new FormControl('')
  })
  initializeFormGroup(){
    this.form.setValue({
      day: 0,
      start: 0,
      finish: 0,
      group: '',
      subject: '',
      teacher: '',
      classroom: ''
    })

  }
  onSubmit() {
    console.log(this.service.form.value)
      this.service.addTimeblock(this.service.form.value as TimeblockModel).subscribe(() => {
        console.log(this.service.form.value)
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
