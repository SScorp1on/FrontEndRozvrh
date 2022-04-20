import {Component} from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";
import {MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-ucitel-formular',
  templateUrl: './ucitel-formular.component.html',
  styleUrls: ['./ucitel-formular.component.css']
})
export class UcitelFormularComponent{

  constructor(public service: UcitelService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<UcitelFormularComponent>) {
  }

  teachers: Ucitel[] = []
  fvalue = ''
  lvalue = ''
  cvalue = ''

  onSubmit() {
    if (this.service.form.valid) {
      this.service.addTeacher(this.service.form.value as Ucitel).subscribe(teacher =>{
        this.teachers.push(teacher)
      });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Ucitel bol pridan do zoznamu');
      this.onClose();

    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
