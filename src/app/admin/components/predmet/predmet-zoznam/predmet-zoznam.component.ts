import {Component,OnInit} from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {PredmetService} from "../../services/predmet.service";


@Component({
  selector: 'app-predmet-zoznam',
  templateUrl: './predmet-zoznam.component.html',
  styleUrls: ['./predmet-zoznam.component.scss']
})
export class PredmetZoznamComponent implements OnInit{

  clickedRow = new Set<Predmet>();
  predmety: Predmet[] = []
columnsToDisplay = ['id','name','type','computerRequired']

  constructor(private service: PredmetService) {
    this.service.getPredmety().subscribe(x => {
      this.predmety = x
      console.log(this.predmety)
    })
  }
  ngOnInit(): void{
    this.getPredmety()
  }

  getPredmety(): void{
    this.service.getPredmety().subscribe(predmety => this.predmety = predmety)
  }


delete(predmet: Predmet): void {
    this.predmety = this.predmety.filter(p => p !== predmet)
    this.service.deletePredmet(predmet.id).subscribe()
}

}
