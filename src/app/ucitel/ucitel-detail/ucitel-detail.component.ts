import {Component, Inject, OnInit} from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-ucitel-detail',
  templateUrl: './ucitel-detail.component.html',
  styleUrls: ['./ucitel-detail.component.scss']
})
export class UcitelDetailComponent implements OnInit {
  teachers: Ucitel[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UcitelService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UcitelDetailComponent>
  ) {}

  ngOnInit(): void {

  }
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
    this.service.updateTeacher(this.data.id , this.form.value).subscribe(predmet =>{
      this.teachers.push(this.form.value)
    });
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success('Predmet bol pridan do zoznamu');
    this.onClose();

  }

  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
