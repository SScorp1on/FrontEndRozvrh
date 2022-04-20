import {Component, Inject, OnInit} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-predmet-detail',
  templateUrl: './predmet-detail.component.html',
  styleUrls: ['./predmet-detail.component.scss']
})
export class PredmetDetailComponent implements OnInit {
  predmety: Predmet[] = []
  value = ''
  type = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-vyberovy'}]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: PredmetService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PredmetDetailComponent>
  ) {}

  ngOnInit(): void {

  console.log(this.data.type)
  }
  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    type: new FormControl(this.data.type),
    computersRequired: new FormControl(this.data.computersRequired)
  })

  initializeFormGroup(){
       this.form.setValue({
        name: this.data.name,
        type: this.data.type,
        computersRequired: this.data.computersRequired
      })

  }
  onSubmit() {
    console.log(this.data)
      this.service.updatePredmet(this.data.id , this.form.value).subscribe(predmet =>{
        this.predmety.push(this.form.value)
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
