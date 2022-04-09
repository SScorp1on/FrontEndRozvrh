import {Component, Inject, OnInit} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import {MatTableDataSource} from "@angular/material/table";
import {Sort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {Dialog} from "primeng/dialog";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-predmet-zoznam',
  templateUrl: './predmet-zoznam.component.html',
  styleUrls: ['./predmet-zoznam.component.scss']
})
export class PredmetZoznamComponent implements OnInit {

  predmety: Predmet[] = []
  displayedColumns: string[] = ['id', 'name', 'type', 'computersRequired', 'EDIT', 'DELETE']
  dataSource = new MatTableDataSource(this.predmety);

  constructor(private service: PredmetService,private router: Router, public dialog: MatDialog) {
    this.predmety = this.predmety.slice();
    this.service.getPredmety().subscribe(x => {
      this.predmety = x
      console.log(this.predmety)
    })
  }



  ngOnInit(): void {
    this.getPredmety()
  }

  getPredmety(): void {
    this.service.getPredmety().subscribe(predmety => this.predmety = predmety)
  }

  delete(predmet: Predmet): void {
    this.predmety = this.predmety.filter(p => p !== predmet)
    this.service.deletePredmet(predmet.id).subscribe()
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
  openDialog(element:any) {
    const dialogRef = this.dialog.open(DialogPredmetConfirmationComponent, {
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(element)
      }
    });
  }
}

@Component({
  selector: 'dialog-predmet-confirmation.component',
  templateUrl: 'dialog-predmet-confirmation.component.html',
})
export class DialogPredmetConfirmationComponent {
  constructor(
  public dialogRef: MatDialogRef<DialogPredmetConfirmationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Predmet,
) {}

  onNoClick(): void{
    this.dialogRef.close()
  }

}
