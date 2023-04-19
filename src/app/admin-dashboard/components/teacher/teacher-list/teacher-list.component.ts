import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSort, Sort} from "@angular/material/sort";
import {Teacher} from "../../models/teacher";
import {TeacherService} from "../../services/teacher.service";
import {TeacherAddComponent} from "../teacher-add/teacher-add.component";
import {TeacherDetailComponent} from "../teacher-detail/teacher-detail.component";
import {TeacherDeleteComponent} from "../teacher-delete/teacher-delete.component";
import {Subject, takeUntil} from "rxjs";

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})

export class TeacherListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  dataSourceTeachers: any;
  isLoaded: boolean = true;

  teachers: Teacher[] = []
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'contact', 'EDIT', 'DELETE']


  constructor(private service: TeacherService,
              private router: Router,
              private dialog: MatDialog) {
  }
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;

  private loadTeachers() {
    this.isLoaded = true;
    this.service.getTeachers().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data => {
        this.teachers = data;
        this.teachers.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceTeachers = new MatTableDataSource(this.teachers);

        this.dataSourceTeachers.sort = this.sort;
        this.dataSourceTeachers.paginator = this.paginator;
      }),
      error : err => {
        alert(`Error ${err}!`);
        this.isLoaded = false;
      }
    });
  }
  onCreate(){
    this.service.initializeFormGroup()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width= "30%"
    const dialogRef = this.dialog.open(TeacherAddComponent, dialogConfig)

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result=>{
      this.loadTeachers()
    })
  }



  onEdit(id: number, firstName: string, lastName: string, contact: string){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(TeacherDetailComponent, {
      data: {id: id, firstName: firstName, lastName: lastName, contact: contact}

    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result =>{

      this.loadTeachers()

    })
  }
  ngOnInit(): void {
    this.loadTeachers()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getTeachers(): void {
    this.service.getTeachers().pipe(takeUntil(this.destroy$)).subscribe(teachers => this.teachers = teachers)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTeachers.filter = filterValue.trim().toLowerCase();
  }


  sortData(sort: Sort) {
    const data = this.teachers.slice();
    if (!sort.active || sort.direction === '') {
      this.teachers = data;
      return;
    }
    this.teachers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        default:
          return 0;
      }
    });
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(TeacherDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if(result!= 0)
      this.loadTeachers()
    });
  }

}



