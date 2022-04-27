import {Component, Inject, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {SubjectModel} from "../../models/subject";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../services/subject.service";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../services/group.service";
import {GroupModel} from "../../models/group.model";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  groups: GroupModel[] = []
  value = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: GroupService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GroupDetailComponent>
  ) {
  }

  ngOnInit(): void {
    console.log(this.data.type)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required)
  })

  initializeFormGroup() {
    this.form.setValue({
      name: this.data.name,
    })

  }

  onSubmit() {
    this.service.updateGroup(this.data.id, this.form.value).pipe(takeUntil(this.destroy$)).subscribe(group => {
      this.groups.push(this.form.value)
    });
    this.form.reset();
    this.initializeFormGroup();
    this.notificationService.success('Skupina bola pridana do zoznamu');
    this.onClose();

  }

  onClose(): void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }
}
