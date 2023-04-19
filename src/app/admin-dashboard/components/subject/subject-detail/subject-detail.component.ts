import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectModel} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  subjects: SubjectModel[] = []
  value = ''
  type = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-voliteľny'}]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: SubjectService,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SubjectDetailComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data.type)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    type: new FormControl(this.data.type),
    computersRequired: new FormControl(this.data.computersRequired)
  })

  initializeFormGroup(){
    this.form.setValue({
      name: this.data.name,
      type: this.data.type,
      computersRequired: this.data.computersRequired
    })

  }
  onSubmit() {
    console.log(this.data)
    this.service.updateSubject(this.data.id , this.form.value).pipe(takeUntil(this.destroy$)).subscribe({next: () =>{
      this.subjects.push(this.form.value)
    }, error: err => {
      this.notificationService.warn(err.error.text)
    },complete: () => {
      this.notificationService.success('Predmet bol pridan do zoznamu');
      this.onClose();
    }});


  }

  onClose():void {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

}
