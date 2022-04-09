import {Component, Inject, OnInit} from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-ucitel-zoznam',
  templateUrl: './ucitel-zoznam.component.html',
  styleUrls: ['./ucitel-zoznam.component.css']
})
export class UcitelZoznamComponent implements OnInit {


  teachers: Ucitel[] = []
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'contact', 'EDIT', 'DELETE']
  dataSource = new MatTableDataSource<Ucitel>(this.teachers);


  constructor(private service: UcitelService,private router: Router,public dialog: MatDialog) {
    this.teachers = this.teachers.slice();
    this.service.getTeachers().subscribe(x => {
      this.teachers = x
      console.log(this.teachers)

    })
  }



  ngOnInit(): void {
    this.getTeachers()
  }

  getTeachers(): void {
    this.service.getTeachers().subscribe(teachers => this.teachers = teachers)
  }


  delete(teacher: Ucitel): void {
    this.teachers = this.teachers.filter(t => t !== teacher)
    this.service.deleteTeacher(teacher.id).subscribe()
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
  openDialog(element:any) {
    const dialogRef = this.dialog.open(DialogUcitelConfirmationComponent, {
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
  selector: 'dialog-ucitel-confirmation.component',
  templateUrl: 'dialog-ucitel-confirmation.component.html',
})
export class DialogUcitelConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogUcitelConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ucitel,
  ) {}

  onNoClick(): void{
    this.dialogRef.close()
  }

}


