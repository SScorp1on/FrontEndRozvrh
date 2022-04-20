import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Miestnost} from "../../models/miestnost.model";
import {MiestnostService} from "../../services/miestnost.service";

@Component({
  selector: 'app-miestnost-delete',
  templateUrl: './miestnost-delete.component.html',
  styleUrls: ['./miestnost-delete.component.css']
})
export class MiestnostDeleteComponent {

  rooms: Miestnost[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: MiestnostService,
    public dialogRef: MatDialogRef<MiestnostDeleteComponent>,

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
    this.service.deleteRoom(this.data.id).subscribe()
  }
}
