import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Teacher} from "../../models/teacher";
import {TeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-teacher-delete',
  templateUrl: './teacher-delete.component.html',
  styleUrls: ['./teacher-delete.component.scss']
})
export class TeacherDeleteComponent {

  teachers: Teacher[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: TeacherService,
    public dialogRef: MatDialogRef<TeacherDeleteComponent>,

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
