import { Component, OnInit } from '@angular/core';
import {Rozvrh} from "../../models/rozvrh.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RozvrhService} from "../../services/rozvrh.service";

@Component({
  selector: 'app-rozvrh-zoznam',
  templateUrl: './rozvrh-zoznam.component.html',
  styleUrls: ['./rozvrh-zoznam.component.css']
})
export class RozvrhZoznamComponent implements OnInit {

   rozvrhy: Rozvrh[] = []

  displayedColumns: string[] = ['id', 'day', 'time', 'lastName','predmetName','ucebnaName', 'EDIT', 'DELETE'];
  constructor(private service: RozvrhService,private router: Router, public dialog: MatDialog) {
    this.rozvrhy = this.rozvrhy.slice();
    this.service.getRozvrhy().subscribe(r => {
      this.rozvrhy = r
      console.log(this.rozvrhy)
    })
  }
predmetName = this.rozvrhy

  ngOnInit(): void {
    this.getRozvrhy()
  }
  getRozvrhy(): void {
    this.service.getRozvrhy().subscribe(rozvrhy => this.rozvrhy = rozvrhy)
  }
}
