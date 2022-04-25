import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Teacher} from "../../models/teacher";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent {

  teachers: Teacher[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: TeacherService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TeacherDetailComponent>
  ) {}

  form: FormGroup = new FormGroup({
    firstName: new FormControl(this.data.firstName, Validators.required),
    lastName: new FormControl(this.data.lastName,Validators.required),
    contact: new FormControl(this.data.contact,Validators.required)
  })
  initializeFormGroup(){
    this.form.setValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      contact: this.data.contact
    })

  }
  onSubmit() {
    console.log(this.data)
    this.service.updateTeacher(this.data.id , this.form.value).subscribe(teacher =>{
      this.teachers.push(this.form.value)
    });
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success('Učitel bol pridan do zoznamu');
    this.onClose();

  }

  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
