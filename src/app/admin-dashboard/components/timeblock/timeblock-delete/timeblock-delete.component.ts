import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {TimeblockService} from "../../services/timeblock.service";

@Component({
  selector: 'app-timeblock-delete',
  templateUrl: './timeblock-delete.component.html',
  styleUrls: ['./timeblock-delete.component.scss']
})
export class TimeblockDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public service: TimeblockService,
    public dialogRef: MatDialogRef<TimeblockDeleteComponent>,

  ) {}

  submitDelete(){
    this.service.deleteTimeblock(this.data.id).subscribe({
       next: () => {

    }, error: err => {
      this.notificationService.warn(err.error.text)
    },complete: () => {
      this.notificationService.success('Rozvrh bol odstranen do zoznamu');
      this.dialogRef.close()
    }})


  }
  onNoClick(): void{
    this.dialogRef.close()
  }

}
