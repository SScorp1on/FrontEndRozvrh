import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassroomService} from "../../services/classroom.service";
import {NotificationService} from "../../services/notification.service";

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
    this.service.deleteClassroom(this.data.id).subscribe({next: ()=> {

      }, error: err => {
      this.notificationService.warn(err.error.text)
        console.log(err)
      }, complete: () => {
      this.notificationService.success('Učebňa bola odstranena zo zoznamu')
        this.dialogRef.close()
      }})
  }
}
