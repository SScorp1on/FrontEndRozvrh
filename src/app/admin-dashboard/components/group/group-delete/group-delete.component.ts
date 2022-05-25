import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.css']
})
export class GroupDeleteComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public service: GroupService,
    public dialogRef: MatDialogRef<GroupDeleteComponent>,

  ) {}

  submitDelete(){
    console.log(this.data)
    this.delete()
  }
  onNoClick(): void{
    this.dialogRef.close()
  }
  delete(): void {
    this.service.deleteGroup(this.data.id).subscribe({next: ()=>{

      }, error: err => {
      this.notificationService.warn(err.error.text)
        console.log(err)
      }, complete: () => {
        this.notificationService.success('Skupina bola odstranena do zoznamu');
        this.dialogRef.close()
      }})
  }
}
