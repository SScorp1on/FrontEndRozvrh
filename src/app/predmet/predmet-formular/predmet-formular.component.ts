import {Component} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-predmet-formular',
  templateUrl: './predmet-formular.component.html',
  styleUrls: ['./predmet-formular.component.scss']
})
export class PredmetFormularComponent {



  constructor(public service: PredmetService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PredmetFormularComponent>) {
  }

  type = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-vyberovy'}]
  value = ''
  predmety: Predmet[] = []



  onSubmit() {
    if (this.service.form.valid) {
        this.service.addPredmet(this.service.form.value as Predmet).subscribe(predmet =>{
          this.predmety.push(predmet)
        });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Predmet bol pridan do zoznamu');
      this.onClose();

    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}

