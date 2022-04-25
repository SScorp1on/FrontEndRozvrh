import {Component, OnInit} from '@angular/core';
import {Rozvrh} from "../admin-dashboard/components/models/rozvrh.model";
import {RozvrhService} from "../admin-dashboard/components/services/rozvrh.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-rozvrh',
  templateUrl: './rozvrh.component.html',
  styleUrls: ['./rozvrh.component.css']
})
export class RozvrhComponent {

rozvrhy: Rozvrh[] = []

  constructor(private service: RozvrhService) {
    this.rozvrhy = this.rozvrhy.slice();
    this.service.getRozvrhy().subscribe(r => {
      this.rozvrhy = r
      console.log(this.rozvrhy)
    })
  }



}
