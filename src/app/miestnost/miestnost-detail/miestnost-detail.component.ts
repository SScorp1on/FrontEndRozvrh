import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Miestnost} from "../../models/miestnost.model";
import {MiestnostService} from "../../services/miestnost.service";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-miestnost-detail',
  templateUrl: './miestnost-detail.component.html',
  styleUrls: ['./miestnost-detail.component.scss']
})
export class MiestnostDetailComponent implements OnInit {

  rooms: Miestnost[] = []
  value = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MiestnostService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MiestnostDetailComponent>
  ) {}
  ngOnInit(): void {

  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    address: new FormControl(this.data.address,Validators.required),
    computersProviding: new FormControl(this.data.computersProviding)
  })

  initializeFormGroup(){
    this.form.setValue({
      name: this.data.name,
      address: this.data.address,
      computersProviding: this.data.computersProviding
    })

  }

  onSubmit() {
    console.log(this.data)
    this.service.updateRoom(this.data.id , this.form.value).subscribe(predmet =>{
      this.rooms.push(this.form.value)
    });
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success('Ucebňa bola pridana do zoznamu');
    this.onClose();

  }
  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }





}
