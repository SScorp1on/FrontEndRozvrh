import { Component, OnInit } from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import {UcitelService} from "../../services/ucitel.service";
import {MiestnostService} from "../../services/miestnost.service";
import {Ucitel} from "../../models/ucitel.model";
import {Miestnost} from "../../models/miestnost.model";
import { async } from 'rxjs';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rozvrh-formular',
  templateUrl: './rozvrh-formular.component.html',
  styleUrls: ['./rozvrh-formular.component.css']
})
export class RozvrhFormularComponent implements OnInit {

  //formular: FormGroup
  predmety: Predmet[] = []
  teachers: Ucitel[] = []
  rooms: Miestnost[] = []
  predmetySelect: { fName: string; lName: string }[] =  []
  constructor(private predmetService: PredmetService,private ucitelService: UcitelService,private miestnostService: MiestnostService) {
    this.predmety = this.predmety.slice();
    this.predmetService.getPredmety().subscribe(p => {
      this.predmety = p
    console.log(this.predmety)
    })
      this.teachers = this.teachers.slice();
      this.ucitelService.getTeachers().subscribe(t => {
        this.teachers = t

    })
    this.rooms = this.rooms.slice();
    this.miestnostService.getRooms().subscribe(r => {
      this.rooms = r

    })
}
  ngOnInit(): void{
    this.getFilteredPredmety()
    this.getFilteredTeachers()
    this.getFilteredRooms()
  }

  async getFilteredPredmety() : Promise<void> {
    const dataPromise: Promise<Predmet[]> = new Promise((resolve, reject) => {
      this.predmetService.getPredmety().subscribe((p: Predmet[]) => {
        resolve(p)
      });
    });
    const data = await dataPromise;
    const filtered: string[] = [];
    for (const e of data) filtered.push(e.name);
    console.log(filtered)
  }
  async getFilteredTeachers() : Promise<void> {
    const dataPromise: Promise<Ucitel[]> = new Promise((resolve, reject) => {
      this.ucitelService.getTeachers().subscribe((t: Ucitel[]) => {
        resolve(t)
      });
    });
    const data = await dataPromise;
    const filtered: {fName: string, lName: string}[] = [];
    for (const e of data) filtered.push({fName: e.lastName, lName: e.firstName});
    this.predmetySelect = filtered
    console.log(filtered)
  }
  async getFilteredRooms() : Promise<void> {
    const dataPromise: Promise<Miestnost[]> = new Promise((resolve, reject) => {
      this.miestnostService.getRooms().subscribe((t: Miestnost[]) => {
        resolve(t)
      });
    });
    const data = await dataPromise;
    const filtered: string[] = [];
    for (const e of data) filtered.push(e.name);
    console.log(filtered)
  }
}
