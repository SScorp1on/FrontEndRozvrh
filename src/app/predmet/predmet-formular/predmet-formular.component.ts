import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-predmet-formular',
  templateUrl: './predmet-formular.component.html',
  styleUrls: ['./predmet-formular.component.css']
})
export class PredmetFormularComponent {

  @Output()
  pridajPredmet = new EventEmitter<Predmet>();
  @Output()
  upravPredmet = new EventEmitter<Predmet>();

  @Input()
  set predmety(p: Predmet | undefined){
    if(p){
      this.naplnForm(p)
    }
  }
  formular: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });



  public uprav(): void {
    this.upravPredmet.emit(this.formular.value);
    this.formular.reset();
  }

  public zrus(): void {
    this.formular.reset();
  }
  private naplnForm(predmet: Predmet): void {
    this.formular.controls['id'].setValue(predmet.id);
    this.formular.controls['name'].setValue(predmet.name);

  }


}
