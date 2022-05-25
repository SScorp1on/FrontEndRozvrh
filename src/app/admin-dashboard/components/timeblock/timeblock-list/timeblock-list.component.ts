import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {TimeblockModel} from "../../models/timeblock.model";
import {TimeblockDeleteComponent} from "../timeblock-delete/timeblock-delete.component";
import {TimeblockService} from "../../services/timeblock.service";
import {TimeblockAddComponent} from "../timeblock-add/timeblock-add.component";
import {Time} from "@angular/common";
import {Teacher} from "../../models/teacher";
import {SubjectModel} from "../../models/subject";
import {Classroom} from "../../models/classroom";
import {TimeblockDetailComponent} from "../timeblock-detail/timeblock-detail.component";
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-timeblock-list',
  templateUrl: './timeblock-list.component.html',
  styleUrls: ['./timeblock-list.component.scss']
})
export class TimeblockListComponent implements OnInit {

  timeblocks: TimeblockModel[] = []

  displayedColumns: string[] = ['id', 'day', 'time','group', 'teacher', 'classroom','subject', 'EDIT', 'DELETE'];
  destroy$: Subject<boolean> = new Subject<boolean>();

  dataSourceTimeblocks: any;
  isLoaded: boolean = true;

  constructor(private service: TimeblockService,
              private router: Router,
              private dialog: MatDialog) {
    this.timeblocks = this.timeblocks.slice();
    this.service.getTimeblocks().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.timeblocks = x
      console.log(this.timeblocks)

    })
  }

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  private loadTimeblocks() {
    this.isLoaded = true;
    this.service.getTimeblocks().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data => {
        this.timeblocks = data;
          this.timeblocks.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceTimeblocks = new MatTableDataSource(this.timeblocks);

        this.dataSourceTimeblocks.sort = this.sort;
        this.dataSourceTimeblocks.paginator = this.paginator;
      }),
      error: err => {
        alert(`Error ${err}!`);
        this.isLoaded = false;
      }
    });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "400px"
    const dialogRef = this.dialog.open(TimeblockAddComponent, dialogConfig)

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadTimeblocks()
    })
  }


  onEdit(id: number, day: string, start: Time, finish: Time, group: string, teacher: Teacher, subject: SubjectModel, classroom: Classroom) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "40px"
    const dialogRef = this.dialog.open(TimeblockDetailComponent, {
      data: {id: id, day: day, start: start, finish: finish, group: group, teacher: teacher, subject: subject, classroom: classroom}
    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadTimeblocks()
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTimeblocks.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.loadTimeblocks()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  sortData(sort: Sort) {
    const data = this.timeblocks.slice();
    if (!sort.active || sort.direction === '') {
      this.timeblocks = data;
      return;
    }
    this.timeblocks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'day':
          return compare(a.day, b.day, isAsc);
        case 'teacher':
          return compare(a.teacher.firstName,b.teacher.firstName, isAsc)
        case 'subject':
          return compare(a.subject.name, b.subject.name, isAsc)
        case 'classroom':
          return compare(a.classroom.name,b.classroom.name,isAsc)
        default:
          return 0;
      }
    });
  }

  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(TimeblockDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadTimeblocks()

    });
  }
}
