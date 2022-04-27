import {Component, OnDestroy} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectModel} from "../../models/subject";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.scss']
})
export class SubjectAddComponent implements OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public service: SubjectService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SubjectAddComponent>) {
  }

  type = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-voliteľny'}]
  value = ''
  subjects: SubjectModel[] = []



  onSubmit() {
    if (this.service.form.valid) {
      this.service.addSubject(this.service.form.value as SubjectModel).pipe(takeUntil(this.destroy$)).subscribe(subject =>{
        this.subjects.push(subject)
      });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Subject bol pridan do zoznamu');
      this.onClose();

    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

