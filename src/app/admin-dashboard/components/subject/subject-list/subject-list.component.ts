import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSort, Sort} from "@angular/material/sort";
import {SubjectDeleteComponent} from "../subject-delete/subject-delete.component";
import {SubjectDetailComponent} from "../subject-detail/subject-detail.component";
import {SubjectAddComponent} from "../subject-add/subject-add.component";
import {SubjectModel} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import { Subject, takeUntil} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit, OnDestroy {
  isLoading = true;
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  dataSourceSubjects: any;
  isLoaded: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  subjects: SubjectModel[] = []
  displayedColumns: string[] = ['id', 'name', 'type', 'computersRequired', 'EDIT', 'DELETE']
  constructor(private service: SubjectService,
              private router: Router,
              private dialog: MatDialog,
              private oauthService: OAuthService
  ) {
    this.oauthService.loadDiscoveryDocument()
    console.log()
    this.subjects = this.subjects.slice();
     this.service.getSubjects().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.subjects = x
       this.isLoading = false
      console.log(this.subjects)
    })

  }
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;

  private loadSubjects() {
    this.isLoaded = true;
     this.service.getSubjects().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data => {
        this.subjects = data;
        this.subjects.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceSubjects = new MatTableDataSource(this.subjects);

        this.dataSourceSubjects.sort = this.sort;
        this.dataSourceSubjects.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(SubjectAddComponent, dialogConfig)

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(()=>{
      this.loadSubjects()
    })
  }
  subject: SubjectModel |  undefined;
  id!: number;

  onEdit(id: number, name: string, type: string, computersRequired: boolean){
    this.id = id
    console.log(id)

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(SubjectDetailComponent, {
      data: {id: id, name: name, type: type, computersRequired: computersRequired}

    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result =>{
      if(result!= 0)
      this.loadSubjects()

    })
  }
  ngOnInit(): void {
   this.loadSubjects();

  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSubjects.filter = filterValue.trim().toLowerCase();
  }


  sortData(sort: Sort) {
    const data = this.subjects.slice();
    if (!sort.active || sort.direction === '') {
      this.subjects = data;
      return;
    }
    this.subjects = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(SubjectDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.loadSubjects()
    });

  }
}
