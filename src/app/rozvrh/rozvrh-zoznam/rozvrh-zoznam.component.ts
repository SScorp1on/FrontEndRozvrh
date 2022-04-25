import {Component, OnInit, ViewChild} from '@angular/core';
import {Rozvrh} from "../../admin-dashboard/components/models/rozvrh.model";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RozvrhService} from "../../admin-dashboard/components/services/rozvrh.service";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Teacher} from "../../admin-dashboard/components/models/teacher";
import {TeacherService} from "../../admin-dashboard/components/services/teacher.service";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {TeacherAddComponent} from "../../admin-dashboard/components/teacher/teacher-add/teacher-add.component";
import {TeacherDetailComponent} from "../../admin-dashboard/components/teacher/teacher-detail/teacher-detail.component";
import {TeacherDeleteComponent} from "../../admin-dashboard/components/teacher/teacher-delete/teacher-delete.component";
import {RozvrhFormComponent} from "../rozvrh-form/rozvrh-form.component";
import {RozvrhDeleteComponent} from "../rozvrh-delete/rozvrh-delete.component";
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-rozvrh-zoznam',
  templateUrl: './rozvrh-zoznam.component.html',
  styleUrls: ['./rozvrh-zoznam.component.scss']
})
export class RozvrhZoznamComponent implements OnInit {

   rozvrhy: Rozvrh[] = []

  displayedColumns: string[] = ['id', 'den', 'cas', 'ucitel','predmet','ucebna', 'EDIT', 'DELETE'];
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  dataSourceRozvrhy: any;
  isLoaded: boolean = true;

  constructor(private service: RozvrhService,
              private router: Router,
              private dialog: MatDialog) {
    this.rozvrhy = this.rozvrhy.slice();
    this.service.getRozvrhy().pipe(takeUntil(this.destroy$)).subscribe(x => {
      this.rozvrhy = x
      console.log(this.rozvrhy)

    })
  }
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;

  private loadRozvrhy() {
    this.isLoaded = true;
    this.service.getRozvrhy().pipe(takeUntil(this.destroy$)).subscribe({
      next:(data => {
        this.rozvrhy = data;
        this.rozvrhy.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceRozvrhy = new MatTableDataSource(this.rozvrhy);

        this.dataSourceRozvrhy.sort = this.sort;
        this.dataSourceRozvrhy.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(RozvrhFormComponent, dialogConfig)

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result=>{
      this.loadRozvrhy()
    })
  }



  onEdit(firstName: string, lastName: string, contact: string){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(RozvrhFormComponent, {
      data: { firstName: firstName, lastName: lastName, contact: contact}

    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result =>{

      this.loadRozvrhy()

    })
  }

  ngOnInit(): void {
    this.loadRozvrhy()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  sortData(sort: Sort) {
    const data = this.rozvrhy.slice();
    if (!sort.active || sort.direction === '') {
      this.rozvrhy = data;
      return;
    }
    this.rozvrhy = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'den':
          return compare(a.den, b.den, isAsc);

        default:
          return 0;
      }
    });
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(RozvrhDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
    this.loadRozvrhy()

    });
  }

}
