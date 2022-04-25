import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectModel} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import {Subject, takeUntil} from "rxjs";
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
    this.delete(this.data.id)
    this.notificationService.success('Predmet bol odstranen do zoznamu');
    this.dialogRef.close()
  }
  onNoClick(): void{
    this.dialogRef.close()
  }
  delete(id: number): void {
    this.service.deleteSubject(id).subscribe()
  }
}
