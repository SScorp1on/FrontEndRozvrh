import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MiestnostService} from "../../services/miestnost.service";
import {Miestnost} from "../../models/miestnost.model";
import {NotificationService} from "../../services/notification.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-miestnost-formular',
  templateUrl: './miestnost-formular.component.html',
  styleUrls: ['./miestnost-formular.component.scss']
})
export class MiestnostFormularComponent {

  valueName = ''
  valueAddress= ''

  constructor(public service: MiestnostService,
              private _snackBar: MatSnackBar,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<MiestnostFormularComponent>) {
  }


  rooms: Miestnost[] = []

  onSubmit() {
    if (this.service.form.valid) {
      this.service.addRoom(this.service.form.value as Miestnost).subscribe(room =>{
        this.rooms.push(room)
      });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Učebňa bola pridana do zoznamu');
      this.onClose();

    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
