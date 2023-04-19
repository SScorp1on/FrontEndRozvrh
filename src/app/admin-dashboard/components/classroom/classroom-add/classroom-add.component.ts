import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ClassroomService} from "../../services/classroom.service";
import {Classroom} from "../../models/classroom";

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.scss']
})
export class ClassroomAddComponent{

  constructor(public service: ClassroomService,
              private _snackBar: MatSnackBar,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ClassroomAddComponent>) {
  }

  rooms: Classroom[] = []

  onSubmit() {
    if (this.service.form.valid) {
      this.service.addClassroom(this.service.form.value as Classroom).subscribe({next: classroom =>{
        this.rooms.push(classroom)
      }, error: err => {
        this.notificationService.warn(err.error.text)
          console.log(err)
        }, complete: () => {
          this.notificationService.success('Učebňa bola pridana do zoznamu');
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
