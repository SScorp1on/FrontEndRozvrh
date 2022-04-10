import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort";
import {Miestnost} from "../../models/miestnost.model";
import {MiestnostService} from "../../services/miestnost.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Predmet} from "../../models/predmet.model";
import {DialogPredmetConfirmationComponent} from "../../predmet/predmet-zoznam/predmet-zoznam.component";

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-miestnost-zoznam',
  templateUrl: './miestnost-zoznam.component.html',
  styleUrls: ['./miestnost-zoznam-component.scss']
})
export class MiestnostZoznamComponent implements OnInit {

  rooms: Miestnost[] = []
  displayedColumns: string[] = ['id', 'name','address','computersProviding', 'EDIT', 'DELETE']
  dataSource = new MatTableDataSource(this.rooms);

  constructor(private service: MiestnostService,private router: Router,public dialog: MatDialog) {
    this.rooms = this.rooms.slice();
    this.service.getRooms().subscribe(x => {
      this.rooms = x
      console.log(this.rooms)
    })
  }

  ngOnInit(): void {
    this.getRooms()
  }

  getRooms(): void {
    this.service.getRooms().subscribe(rooms => this.rooms = rooms)
  }


  delete(miestnost: Miestnost): void {
    this.rooms = this.rooms.filter(m => m !== miestnost)
    this.service.deleteRoom(miestnost.id).subscribe()
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
  selector: 'dialog-miestnost-confirmation.component',
  templateUrl: 'dialog-miestnost-confirmation.component.html',
})
export class DialogMiestnostConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogMiestnostConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Predmet,
  ) {}

  onNoClick(): void{
    this.dialogRef.close()
  }

}
