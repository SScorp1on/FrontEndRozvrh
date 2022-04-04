import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";

@Component({
  selector: 'app-predmet-zoznam',
  templateUrl: './predmet-zoznam.component.html',
  styleUrls: ['./predmet-zoznam.component.css']
})
export class PredmetZoznamComponent implements OnInit{

  predmety: Predmet[] = []
  constructor(private service: PredmetService) {
  }
  ngOnInit(): void{
    this.getPredmety()
  }

  getPredmety(): void{
    this.service.getPredmety().subscribe(predmety => this.predmety = predmety)
  }

addPredmet(name: string): void {
    name = name.trim();
    if(!name){return}
    this.service.addPredmet({name} as Predmet).subscribe(predmet => {
      this.predmety.push(predmet)
    })
}
delete(predmet: Predmet): void {
    this.predmety = this.predmety.filter(p => p !== predmet)
    this.service.deletePredmet(predmet.id).subscribe()
}

  /*uprav(predmet: Predmet): void {
  this.upravPredmet.emit(predmet)
  }

  zmaz(predmet: Predmet): void {
    this.zmazPredmet.emit(predmet)
  }

   */
}
