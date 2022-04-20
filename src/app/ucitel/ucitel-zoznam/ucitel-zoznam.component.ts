import {Component, OnInit, ViewChild} from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSort, Sort} from "@angular/material/sort";
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {UcitelFormularComponent} from "../ucitel-formular/ucitel-formular.component";
import {UcitelDetailComponent} from "../ucitel-detail/ucitel-detail.component";
import {UcitelDeleteComponent} from "../ucitel-delete/ucitel-delete.component";


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-ucitel-zoznam',
  templateUrl: './ucitel-zoznam.component.html',
  styleUrls: ['./ucitel-zoznam.component.css']
})
export class UcitelZoznamComponent implements OnInit {
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  dataSourceTeachers: any;
  isLoaded: boolean = true;

  teachers: Ucitel[] = []
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'contact', 'EDIT', 'DELETE']
  dataSource = new MatTableDataSource<Ucitel>(this.teachers);


  constructor(private service: UcitelService,
              private router: Router,
              private dialog: MatDialog) {
    this.teachers = this.teachers.slice();
    this.service.getTeachers().subscribe(x => {
      this.teachers = x
      console.log(this.teachers)

    })
  }
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;

  private loadTeachers() {
    this.isLoaded = true;
    this.service.getTeachers().subscribe({
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
    const dialogRef = this.dialog.open(UcitelFormularComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result=>{
      this.loadTeachers()
    })
  }
  teacher: Ucitel |  undefined;
  id!: number;

  onEdit(id: number, firstName: string, lastName: string, contact: string){
    this.id = id
    console.log(id)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(UcitelDetailComponent, {
      data: {id: id, firstName: firstName, lastName: lastName, contact: contact}

    })
    dialogRef.afterClosed().subscribe(result =>{

      this.loadTeachers()

    })
  }
  ngOnInit(): void {
    this.loadTeachers()
  }

  getTeachers(): void {
    this.service.getTeachers().subscribe(teachers => this.teachers = teachers)
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
  back(){
    this.router.navigate(['/home']);
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(UcitelDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.loadTeachers()
    });
  }

}





