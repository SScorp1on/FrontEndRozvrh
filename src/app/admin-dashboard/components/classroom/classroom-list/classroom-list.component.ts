import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSort, Sort} from "@angular/material/sort";
import {Classroom} from "../../models/classroom";
import {ClassroomService} from "../../services/classroom.service";
import {ClassroomAddComponent} from "../classroom-add/classroom-add.component";
import {ClassroomDetailComponent} from "../classroom-detail/classroom-detail.component";
import {ClassroomDeleteComponent} from "../classroom-delete/classroom-delete.component";
import {Subject, takeUntil} from "rxjs";

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;
  dataSourceClassrooms: any;
  isLoaded: boolean = true;
  classrooms: Classroom[] = []
  displayedColumns: string[] = ['id', 'name','address','computersProviding', 'EDIT', 'DELETE']
  dataSource = new MatTableDataSource<Classroom>(this.classrooms);

  constructor(private service: ClassroomService,
              private router: Router,
              public dialog: MatDialog) {
    this.classrooms = this.classrooms.slice();
    this.service.getClassrooms().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.classrooms = x
      console.log(this.classrooms)
    })
  }


  private loadClassrooms() {
    this.isLoaded = true;
    this.service.getClassrooms().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data => {
        this.classrooms = data;
        this.classrooms.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceClassrooms = new MatTableDataSource(this.classrooms);

        this.dataSourceClassrooms.sort = this.sort;
        this.dataSourceClassrooms.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(ClassroomAddComponent, dialogConfig)

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result=>{
      this.loadClassrooms()
    })
  }



  onEdit(id: number, name: string, address: string,computersProviding: boolean){

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(ClassroomDetailComponent, {
      data: {id: id, name: name, address: address,computersProviding: computersProviding}

    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result =>{
      if (result!=0)
      this.loadClassrooms()
    })
  }
  ngOnInit(): void {
    this.loadClassrooms()
  }
  ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe()

  }

  getRooms(): void {
    this.service.getClassrooms().pipe(takeUntil(this.destroy$)).subscribe(classrooms => this.classrooms = classrooms)
  }


  sortData(sort: Sort) {
    const data = this.classrooms.slice();
    if (!sort.active || sort.direction === '') {
      this.classrooms = data;
      return;
    }
    this.classrooms = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(ClassroomDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if(result!= 0)
      this.loadClassrooms()
    });
  }
}
