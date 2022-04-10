import { Component, OnInit } from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PredmetService} from "../../services/predmet.service";
import {Location} from "@angular/common";
import {Miestnost} from "../../models/miestnost.model";
import {MiestnostService} from "../../services/miestnost.service";

@Component({
  selector: 'app-miestnost-detail',
  templateUrl: './miestnost-detail.component.html',
  styleUrls: ['./miestnost-detail.component.css']
})
export class MiestnostDetailComponent implements OnInit {

  room: Miestnost |  undefined;

  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]/)])
  address = new FormControl('',[Validators.required])
  constructor(
    private route: ActivatedRoute,
    private miestnostService: MiestnostService,
    private location: Location
  ) {}

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Musíte zadať hodnotu';
    }
    return this.name.hasError('name') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.miestnostService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.room) {
      this.miestnostService.updateRoom(this.room)
        .subscribe(() => this.goBack());
    }
  }
}
