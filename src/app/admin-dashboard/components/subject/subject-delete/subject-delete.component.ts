import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../services/subject.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-subject-delete',
  templateUrl: './subject-delete.component.html',
  styleUrls: ['./subject-delete.component.scss']
})
export class SubjectDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public service: SubjectService,
    public dialogRef: MatDialogRef<SubjectDeleteComponent>,

  ) {}

  submitDelete(){
    console.log(this.data)
    this.delete()

  }
  onNoClick(): void{
    this.dialogRef.close()
  }
  delete(): void {
    this.service.deleteSubject(this.data.id).subscribe( {next: () => {
    }, error: err => {
      this.notificationService.warn(err.message.text)
        console.log(err)
    },complete: () => {
      this.notificationService.success('Predmet bol odstranen do zoznamu');
      this.dialogRef.close()
    }})
  }
}
