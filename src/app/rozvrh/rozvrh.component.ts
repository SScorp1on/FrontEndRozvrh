import {Component, OnInit} from '@angular/core';
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {Dni} from "../models/dni.model";
import {Rozvrh} from "../models/rozvrh.model";
import {Miestnost} from "../models/miestnost.model";

@Component({
  selector: 'app-rozvrh',
  templateUrl: './rozvrh.component.html',
  styleUrls: ['./rozvrh.component.css']
})
export class RozvrhComponent implements OnInit{


 arrDni = [Dni.Pondelok,Dni.Utorok, Dni.Streda, Dni.stvrtok,Dni.Piatok]
  ngOnInit(): void{
    console.log(this.arrDni)
  }

}
