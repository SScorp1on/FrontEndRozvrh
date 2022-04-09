import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {PredmetService} from "../../services/predmet.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Predmet} from "../../models/predmet.model";
import {MiestnostService} from "../../services/miestnost.service";
import {Miestnost} from "../../models/miestnost.model";

@Component({
  selector: 'app-miestnost-formular',
  templateUrl: './miestnost-formular.component.html',
  styleUrls: ['./miestnost-formular.component.scss']
})
export class MiestnostFormularComponent {

  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]/)])
  address = new FormControl('',[Validators.required])
  valueName = ''
  valueAddress= ''
  openSnackBar() {
    this._snackBar.open('Miestnosť bola pridana do zoznamu', 'OK',{ duration: 3000});
  }
  constructor(private service: MiestnostService, private _snackBar: MatSnackBar) {
  }
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Musíte zadať hodnotu';
    }
    return this.name.hasError('adress')
  }

  checked = false;

  Rooms: Miestnost[] = []

  addRoom(name: string,computersProviding: boolean,address: string): void {
    name = name.trim();
    if(!name){return}
    this.service.addRoom({name,computersProviding,address} as Miestnost).subscribe(miestnost => {
      this.Rooms.push(miestnost)
    })
  }
}
