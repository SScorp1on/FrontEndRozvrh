import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomService} from "../../services/classroom.service";

@Component({
  selector: 'app-classroom-delete',
  templateUrl: './classroom-delete.component.html',
  styleUrls: ['./classroom-delete.component.scss']
})
export class ClassroomDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ClassroomService,
    public dialogRef: MatDialogRef<ClassroomDeleteComponent>,

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
    this.service.deleteClassroom(this.data.id).subscribe()
  }
}
