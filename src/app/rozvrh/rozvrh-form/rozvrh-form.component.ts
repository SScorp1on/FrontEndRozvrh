import {Component, Inject} from '@angular/core';
import {NotificationService} from "../../admin-dashboard/components/services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Rozvrh} from "../../admin-dashboard/components/models/rozvrh.model";
import {RozvrhService} from "../../admin-dashboard/components/services/rozvrh.service";
import {Den} from "../../admin-dashboard/components/models/dni.model";
import {TeacherService} from "../../admin-dashboard/components/services/teacher.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {SubjectService} from "../../admin-dashboard/components/services/subject.service";
import {ClassroomService} from "../../admin-dashboard/components/services/classroom.service";
import {SubjectModel} from "../../admin-dashboard/components/models/subject";
import {Teacher} from "../../admin-dashboard/components/models/teacher";
import {Classroom} from "../../admin-dashboard/components/models/classroom";

@Component({
  selector: 'app-rozvrh-form',
  templateUrl: './rozvrh-form.component.html',
  styleUrls: ['./rozvrh-form.component.scss']
})
export class RozvrhFormComponent {
  teachers: Teacher[] = []
  subjects: SubjectModel[] = []
  classrooms: Classroom[] = []
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
                public service: RozvrhService,
                public teacherService: TeacherService,
                private subjectService: SubjectService,
                private classroomService: ClassroomService,
                private notificationService: NotificationService,
                private _snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<RozvrhFormComponent>


  ) {
    this.teachers = this.teachers.slice();
    this.teacherService.getTeachers().subscribe(x => {
      this.teachers = x

    })
    this.subjects = this.subjects.slice();
    this.subjectService.getSubjects().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.subjects = x
      console.log(this.subjects)
    })
    this.classrooms = this.classrooms.slice();
    this.classroomService.getClassrooms().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.classrooms = x
      console.log(this.classrooms)
    })
  }
  dni: Den[]  = [Den.Pondelok,Den.Utorok,Den.Streda,Den.Stvortok,Den.Piatok]
  rozvrhy: Rozvrh[] = []

  value = ''
  ngOnInit(): void {
    this.teacherService.getTeachers()
    this.subjectService.getSubjects()
    this.classroomService.getClassrooms()
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  form: FormGroup = new FormGroup({
    den: new FormControl(this.dni, Validators.required),
    start: new FormControl(0, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
    finish: new FormControl(0, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
    subject: new FormControl(this.subjects),
    teacher: new FormControl(this.teachers),
    classroom: new FormControl(this.classrooms)
  })

  initializeFormGroup(){
    this.form.setValue({
      den: this.dni,
      start: 0,
      finish: 0,
      subject: '',
      teacher: '',
      classroom: ''
    })

  }
  onSubmit() {
    if (this.service.form.valid) {
      this.service.addRozvrh(this.service.form.value as Rozvrh).subscribe(rozvrh => {
        console.log(this.service.form.value)
        this.rozvrhy.push(rozvrh)
      });
      this.form.reset();
      this.initializeFormGroup();
      this.notificationService.success('Predmet bol pridan do zoznamu');
      this.onClose();
    }
  }

  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
