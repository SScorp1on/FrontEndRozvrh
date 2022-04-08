import {Component} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";
import { FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-predmet-formular',
  templateUrl: './predmet-formular.component.html',
  styleUrls: ['./predmet-formular.component.scss']
})
export class PredmetFormularComponent {

  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]/)])

  openSnackBar() {
    this._snackBar.open('Predmet bol pridan do zoznamu', 'OK',{ duration: 3000});
  }

  constructor(private service: PredmetService, private _snackBar: MatSnackBar) {
  }
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Musíte zadať hodnotu';
    }
    return this.name.hasError('name') ? 'Not a valid email' : '';
  }

  checked = false;
  typPredmetu = [] = [{value: 'Povinny'}, {value: 'Vyberovy'}, {value: 'Povinne-vyberovy'}]

  selectedType = this.typPredmetu[0].value;
  predmety: Predmet[] = []

  addPredmet(name: string,computerRequired: boolean,type: string): void {
    name = name.trim();
    if(!name){return}
    this.service.addPredmet({name,computerRequired,type} as Predmet).subscribe(predmet => {
      this.predmety.push(predmet)
    })
  }
}

