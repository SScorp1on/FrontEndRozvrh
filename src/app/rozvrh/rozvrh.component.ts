import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-rozvrh',
  templateUrl: './rozvrh.component.html',
  styleUrls: ['./rozvrh.component.css']
})
export class RozvrhComponent implements OnInit{
  displayedColumns: string[] = ['Pondelok','Utorok', 'Streda','Stvortok', 'Piatok']
  columnsToDisplay: string[] = this.displayedColumns.slice();
  displayedColumns2: string[] = ['cas']
  ngOnInit(): void{
  }

}
