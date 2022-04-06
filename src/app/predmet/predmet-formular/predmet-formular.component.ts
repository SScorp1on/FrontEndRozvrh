import {Component} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-predmet-formular',
  templateUrl: './predmet-formular.component.html',
  styleUrls: ['./predmet-formular.component.scss']
})
export class PredmetFormularComponent {


  constructor(private service: PredmetService,
              private formular: FormBuilder) {
    this.formular
  }
  checked = false;
  typPredmetu = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-vyberovy'}]

  selectedType = this.typPredmetu[1].value;
  predmety: Predmet[] = []

  addPredmet(name: string,computerRequired: boolean,type: string): void {
    name = name.trim();
    if(!name){return}
    this.service.addPredmet({name,computerRequired,type} as Predmet).subscribe(predmet => {
      this.predmety.push(predmet)
    })
  }
}
