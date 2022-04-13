import {Component, OnInit} from '@angular/core';
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {Dni} from "../models/dni.model";
import {Rozvrh} from "../models/rozvrh.model";
import {Miestnost} from "../models/miestnost.model";
import {Cas} from "../models/cas.model";
import {C} from "@angular/cdk/keycodes";
type Time = {
  hours: number
  minutes: number
}

@Component({
  selector: 'app-rozvrh',
  templateUrl: './rozvrh.component.html',
  styleUrls: ['./rozvrh.component.css']
})
export class RozvrhComponent implements OnInit{
  displayedColumns: string[] = ['Pondelok','Utorok', 'Streda','Stvortok', 'Piatok2','Piatok3','Piatok4','Piatok5','Piatok6','Piatok86']
  columnsToDisplay: string[] = this.displayedColumns.slice();
  arrCas = [Cas]

  ngOnInit(): void{
    console.log(this.arrCas)
  }
 // rozvrh = this.arrCas.concat(arrDniCas)
}
