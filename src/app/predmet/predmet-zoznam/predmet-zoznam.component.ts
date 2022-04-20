import { Component, OnInit, ViewChild} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import { MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PredmetFormularComponent} from "../predmet-formular/predmet-formular.component";
import {MatPaginator} from "@angular/material/paginator";
import {PredmetDetailComponent} from "../predmet-detail/predmet-detail.component";
import {PredmetDeleteComponent} from "../predmet-delete/predmet-delete.component";

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-predmet-zoznam',
  templateUrl: './predmet-zoznam.component.html',
  styleUrls: ['./predmet-zoznam.component.scss']
})
export class PredmetZoznamComponent implements OnInit{
  @ViewChild(MatPaginator,  {static: true}) paginator!: MatPaginator;
  dataSourcePredmety: any;
  isLoaded: boolean = true;

  predmety: Predmet[] = []
  dataSource = new MatTableDataSource<Predmet>(this.predmety)
  displayedColumns: string[] = ['id', 'name', 'type', 'computersRequired', 'EDIT', 'DELETE']
  constructor(private service: PredmetService,
              private router: Router,
              private dialog: MatDialog
             ) {
    this.predmety = this.predmety.slice();
    this.service.getPredmety().subscribe(x => {
      this.predmety = x
      console.log(this.predmety)
    })
  }
  @ViewChild(MatSort,  {static: true}) sort!: MatSort;

  private loadPredmety() {
    this.isLoaded = true;
    this.service.getPredmety().subscribe({
      next:(data => {
        this.predmety = data;
        this.predmety.sort(function (obj1, obj2) {
          // Descending: first id less than the previous
          return obj2.id - obj1.id;
        });
        this.isLoaded = false;
        this.dataSourcePredmety = new MatTableDataSource(this.predmety);

        this.dataSourcePredmety.sort = this.sort;
        this.dataSourcePredmety.paginator = this.paginator;
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
 const dialogRef = this.dialog.open(PredmetFormularComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result=>{
      this.loadPredmety()
    })
}
  predmet: Predmet |  undefined;
      id!: number;

    onEdit(id: number, name: string, type: string, computersRequired: boolean){
      this.id = id
      console.log(id)

    const dialogConfig = new MatDialogConfig()
   dialogConfig.disableClose = true
   dialogConfig.autoFocus = true
    dialogConfig.width = "30%"
    const dialogRef = this.dialog.open(PredmetDetailComponent, {
    data: {id: id, name: name, type: type, computersRequired: computersRequired}

  })
    dialogRef.afterClosed().subscribe(result =>{

        this.loadPredmety()

    })
  }
  ngOnInit(): void {
    this.loadPredmety();
  }
  getPredmety(): void {
    this.service.getPredmety().subscribe(predmety => this.predmety = predmety)
  }





  sortData(sort: Sort) {
    const data = this.predmety.slice();
    if (!sort.active || sort.direction === '') {
      this.predmety = data;
      return;
    }
    this.predmety = data.sort((a, b) => {
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
  back(){
    this.router.navigate(['/home']);
  }
  onDelete(id: number) {
    console.log(id)
    const dialogRef = this.dialog.open(PredmetDeleteComponent, {
      data: {id: id},
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.loadPredmety()
    });
  }
}


