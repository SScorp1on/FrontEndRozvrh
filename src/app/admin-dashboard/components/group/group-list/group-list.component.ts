import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OAuthService} from "angular-oauth2-oidc";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SubjectAddComponent} from "../../subject/subject-add/subject-add.component";
import {SubjectDetailComponent} from "../../subject/subject-detail/subject-detail.component";
import {SubjectDeleteComponent} from "../../subject/subject-delete/subject-delete.component";
import {GroupService} from "../../services/group.service";
import {GroupAddComponent} from "../group-add/group-add.component";
import {GroupDetailComponent} from "../group-detail/group-detail.component";
import {GroupDeleteComponent} from "../group-delete/group-delete.component";
import {Subject, takeUntil} from "rxjs";
import {GroupModel} from "../../models/group.model";
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {

  isLoading = true;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSourceSubjects: any;
  isLoaded: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  groups: GroupModel[] = []
  displayedColumns: string[] = ['id', 'name', 'EDIT', 'DELETE']

  constructor(private service: GroupService,
              private router: Router,
              private dialog: MatDialog,
  ) {
    console.log()
    this.groups = this.groups.slice();
    this.service.getGroups().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.groups = x
      this.isLoading = false
      console.log(this.groups)
    })

  }

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private loadSubjects() {
    this.isLoaded = true;
    this.service.getGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data => {
        this.groups = data;
        this.groups.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceSubjects = new MatTableDataSource(this.groups);

        this.dataSourceSubjects.sort = this.sort;
        this.dataSourceSubjects.paginator = this.paginator;
      }),
      error: err => {
        alert(`Error ${err}!`);
        this.isLoaded = false;
      }

    });
  }

  onCreate() {
    this.service.initializeFormGroup()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(GroupAddComponent, dialogConfig)

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.loadSubjects()
    })
  }

  subject: GroupModel | undefined;
  id!: number;

  onEdit(id: number, name: string) {
    this.id = id
    console.log(id)

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(GroupDetailComponent, {
      data: {id: id, name: name}

    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result != 0)
        this.loadSubjects()

    })
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSubjects.filter = filterValue.trim().toLowerCase();
  }


  sortData(sort: Sort) {
    const data = this.groups.slice();
    if (!sort.active || sort.direction === '') {
      this.groups = data;
      return;
    }
    this.groups = data.sort((a, b) => {
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
    const dialogRef = this.dialog.open(GroupDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.loadSubjects()
    });

  }
}
