import {Component, OnInit} from '@angular/core';
import {TimeblockService} from "../../services/timeblock.service";
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
  styleUrls: ['./timeblock-add.component.scss']
})
export class TimeblockAddComponent implements OnInit {
  timeblocks: TimeblockModel[] = []
  teachers: Teacher[] = []
  subjects: SubjectModel[] = []
  classrooms: Classroom[] = []
  groups: GroupModel[]  = []
  destroy$: Subject<boolean> = new Subject<boolean>();
  days = Day
  enumKeys: any = [];
  constructor(

    public service: TimeblockService,
    public mainService: MainService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TimeblockAddComponent>

  ) {

    this.enumKeys = Object.keys(this.days).filter(f => !isNaN(Number(f)))
      .map(k => parseInt(k));
  }

  ngOnInit(): void {
    this.mainService.getAllObjects()
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  form: FormGroup = new FormGroup({
    day: new FormControl(null, Validators.required),
    start: new FormControl(''),
    finish: new FormControl(''),
    group: new FormControl(''),
    subject: new FormControl(''),
    teacher: new FormControl(''),
    classroom: new FormControl('')
  })
  initializeFormGroup(){
    this.form.setValue({
      day: 0,
      start: '',
      finish: '',
      group: '',
      subject: '',
      teacher: '',
      classroom: ''
    })

  }
  onSubmit() {
    console.log(this.form.value)
      this.service.addTimeblock(this.form.value as TimeblockModel).pipe(takeUntil(this.destroy$)).subscribe({next: timeblocks => {
        this.timeblocks.push(timeblocks)
      }, error: err => {
        this.notificationService.warn(err.error.text)
      },complete: () =>{
        this.notificationService.success('Rozvrh bol pridan do zoznamu');
        this.onClose();
      }});


  }

  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
