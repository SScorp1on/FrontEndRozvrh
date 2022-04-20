import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";

@Component({
  selector: 'app-ucitel-delete',
  templateUrl: './ucitel-delete.component.html',
  styleUrls: ['./ucitel-delete.component.css']
})
export class UcitelDeleteComponent {

  teachers: Ucitel[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UcitelService,
    public dialogRef: MatDialogRef<UcitelDeleteComponent>,

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
    this.service.deleteTeacher(this.data.id).subscribe()
  }
}
