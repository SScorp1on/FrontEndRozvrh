import { Component } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {GroupModel} from "../../models/group.model";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent  {

  constructor(public service: GroupService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GroupAddComponent>) {
  }

  value = ''
  groups: GroupModel[] = []



  onSubmit() {
    if (this.service.form.valid) {
      this.service.addGroup(this.service.form.value as GroupModel).subscribe(group =>{
        this.groups.push(group)
      });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Skupina bola pridana do zoznamu');
      this.onClose();

    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
