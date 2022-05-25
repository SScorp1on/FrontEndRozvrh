import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Teacher} from "../../models/teacher";
import {TeacherService} from "../../services/teacher.service";
import {NotificationService} from "../../services/notification.service";

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
    private notificationService: NotificationService

  ) {}

  submitDelete(){
    console.log(this.data)
    this.delete()
  }
  onNoClick(): void{
    this.dialogRef.close()
  }
  delete(): void {
    this.service.deleteTeacher(this.data.id).subscribe({next: ()=>{

      }, error: err => {
      this.notificationService.warn(err.error.text)
        console.log(err)
      }, complete: () => {
        this.dialogRef.close()
      }})
  }
}
