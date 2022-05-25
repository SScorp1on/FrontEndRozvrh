import { Component } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {Teacher} from "../../models/teacher";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent {

  constructor(public service: TeacherService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TeacherAddComponent>) {
  }

  teachers: Teacher[] = []


  onSubmit() {
    if (this.service.form.valid) {
      this.service.addTeacher(this.service.form.value as Teacher).subscribe({next: teacher => {
        this.teachers.push(teacher)
      }, error: err => {
        this.notificationService.warn(err.error.text)
          console.log(err)
        }, complete: () => {
          this.notificationService.success('Ucitel bol pridan do zoznamu');
          this.onClose();
        }});


    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
