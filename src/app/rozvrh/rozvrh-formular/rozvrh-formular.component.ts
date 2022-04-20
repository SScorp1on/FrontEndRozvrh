import { Component, OnInit } from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import {UcitelService} from "../../services/ucitel.service";
import {MiestnostService} from "../../services/miestnost.service";
import {Ucitel} from "../../models/ucitel.model";
import {Miestnost} from "../../models/miestnost.model";
import {RozvrhService} from "../../services/rozvrh.service";
import {Dni} from "../../models/dni.model";

@Component({
  selector: 'app-rozvrh-formular',
  templateUrl: './rozvrh-formular.component.html',
  styleUrls: ['./rozvrh-formular.component.css']
})
export class RozvrhFormularComponent implements OnInit {

  dni: Dni[] = []
  predmety: Predmet[] = []
  teachers: Ucitel[] = []
  rooms: Miestnost[] = []
  constructor(private predmetService: PredmetService,private ucitelService: UcitelService,private miestnostService: MiestnostService, public rozvrhService: RozvrhService) {
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
  console.log(this.dni)
  }
  onSubmit(){

  }

}
