import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Classroom} from "../../models/classroom";
import {ClassroomService} from "../../services/classroom.service";

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.scss']
})
export class ClassroomDetailComponent {

  classrooms: Classroom[] = []
  value = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClassroomService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ClassroomDetailComponent>
  ) {
  }


  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    address: new FormControl(this.data.address, Validators.required),
    computersProviding: new FormControl(this.data.computersProviding)
  })

  initializeFormGroup() {
    this.form.setValue({
      name: this.data.name,
      address: this.data.address,
      computersProviding: this.data.computersProviding
    })

  }

  onSubmit() {
    console.log(this.data)
    this.service.updateClassroom(this.data.id, this.form.value).subscribe(classroom => {
      this.classrooms.push(this.form.value)
    });
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success('Ucebňa bola pridana do zoznamu');
    this.onClose();

  }

  onClose(): void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
