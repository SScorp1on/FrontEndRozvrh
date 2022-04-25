import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../admin-dashboard/components/services/notification.service";
import {SubjectService} from "../../admin-dashboard/components/services/subject.service";
import {RozvrhService} from "../../admin-dashboard/components/services/rozvrh.service";

@Component({
  selector: 'app-rozvrh-delete',
  templateUrl: './rozvrh-delete.component.html',
  styleUrls: ['./rozvrh-delete.component.css']
})
export class RozvrhDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public service: RozvrhService,
    public dialogRef: MatDialogRef<RozvrhDeleteComponent>,

  ) {}

  submitDelete(){
    this.service.deleteRozvrh(this.data.id).subscribe()
      this.notificationService.success('Rozvrh bol odstranen do zoznamu');
    this.dialogRef.close()
  }
  onNoClick(): void{
    this.dialogRef.close()
  }

}
