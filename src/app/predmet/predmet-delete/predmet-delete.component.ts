import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";

@Component({
  selector: 'app-predmet-delete',
  templateUrl: './predmet-delete.component.html',
  styleUrls: ['./predmet-delete.component.css']
})
export class PredmetDeleteComponent{
  predmety: Predmet[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: PredmetService,
    public dialogRef: MatDialogRef<PredmetDeleteComponent>,

  ) {}

  submitDelete(){
    console.log(this.data)
    this.delete(this.data.id)
    this.dialogRef.close()
  }
  onNoClick(): void{
    this.dialogRef.close()
  }
  delete(id: number): void {
    this.service.deletePredmet(this.data.id).subscribe()
  }
}

