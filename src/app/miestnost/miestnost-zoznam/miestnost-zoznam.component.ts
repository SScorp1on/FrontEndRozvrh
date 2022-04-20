import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSort, Sort} from "@angular/material/sort";
import {Miestnost} from "../../models/miestnost.model";
import {MiestnostService} from "../../services/miestnost.service";
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MiestnostDetailComponent} from "../miestnost-detail/miestnost-detail.component";
import {MiestnostDeleteComponent} from "../miestnost-delete/miestnost-delete.component";
import {MiestnostFormularComponent} from "../miestnost-formular/miestnost-formular.component";


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-miestnost-zoznam',
  templateUrl: './miestnost-zoznam.component.html',
  styleUrls: ['./miestnost-zoznam-component.scss']
})
export class MiestnostZoznamComponent implements OnInit {
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  dataSourceRooms: any;
  isLoaded: boolean = true;
  rooms: Miestnost[] = []
  displayedColumns: string[] = ['id', 'name','address','computersProviding', 'EDIT', 'DELETE']
  dataSource = new MatTableDataSource<Miestnost>(this.rooms);

  constructor(private service: MiestnostService,
              private router: Router,
              public dialog: MatDialog) {
    this.rooms = this.rooms.slice();
    this.service.getRooms().subscribe(x => {
      this.rooms = x
      console.log(this.rooms)
    })
  }
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;

  private loadRooms() {
    this.isLoaded = true;
    this.service.getRooms().subscribe({
      next:(data => {
        this.rooms = data;
        this.rooms.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourceRooms = new MatTableDataSource(this.rooms);

        this.dataSourceRooms.sort = this.sort;
        this.dataSourceRooms.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(MiestnostFormularComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result=>{
      this.loadRooms()
    })
  }
  room: Miestnost |  undefined;
  id!: number;

  onEdit(id: number, name: string, address: string,computersProviding: boolean){
    this.id = id
    console.log(id)

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(MiestnostDetailComponent, {
      data: {id: id, name: name, address: address,computersProviding: computersProviding}

    })
    dialogRef.afterClosed().subscribe(result =>{

      this.loadRooms()

    })
  }
  ngOnInit(): void {
    this.loadRooms()
  }
  getRooms(): void {
    this.service.getRooms().subscribe(rooms => this.rooms = rooms)
  }


  sortData(sort: Sort) {
    const data = this.rooms.slice();
    if (!sort.active || sort.direction === '') {
      this.rooms = data;
      return;
    }
    this.rooms = data.sort((a, b) => {
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
  back(){
    this.router.navigate(['/home']);
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(MiestnostDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.loadRooms()
    });
  }
}
