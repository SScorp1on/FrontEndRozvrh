import { Component, OnInit } from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {ActivatedRoute} from "@angular/router";
import {PredmetService} from "../../services/predmet.service";
import{ Location } from "@angular/common";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-predmet-detail',
  templateUrl: './predmet-detail.component.html',
  styleUrls: ['./predmet-detail.component.scss']
})
export class PredmetDetailComponent implements OnInit {
  predmet: Predmet |  undefined;
  typPredmetu = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-vyberovy'}]
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]/)])
  constructor(
    private route: ActivatedRoute,
    private predmetService: PredmetService,
    private location: Location
  ) {}
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Musíte zadať hodnotu';
    }
    return this.name.hasError('name') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    this.getPredmet();
  }

  getPredmet(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.predmetService.getPredmet(id)
      .subscribe(predmet => this.predmet = predmet);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.predmet) {
      this.predmetService.updatePredmet(this.predmet)
        .subscribe(() => this.goBack());
    }
  }
}
