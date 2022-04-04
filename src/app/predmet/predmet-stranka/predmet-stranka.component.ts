import { Component, OnInit } from '@angular/core';
import {Predmet} from "../../models/predmet.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-predmet-stranka',
  templateUrl: './predmet-stranka.component.html',
  styleUrls: ['./predmet-stranka.component.css']
})
export class PredmetStrankaComponent implements OnInit {

  predmety: Predmet[] = [];

  predmetNaUpravu?: Predmet;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    console.log('1');
    const vysledok: Observable<Predmet[]> = this.http.get<Predmet[]>('http://localhost:8080/api/predmety');
    vysledok.subscribe(data => {
      console.log('prislo:' + data);
    });
    console.log('2');
  }

  chodSpat(): void {
    this.router.navigate(['']);
  }

  pridaj(predmet: Predmet): void {
    this.predmety.push(predmet);
  }

  uprav(predmet: Predmet): void {
    const index = this.predmety.findIndex(predmetArray => predmetArray.id === predmet.id);
    if (index !== -1) {
      this.predmety[index] = predmet;
    }
  }

  zmazZoZoznamu(predmet: Predmet): void {
    const index = this.predmety.findIndex(predmetArray => predmetArray.id === predmet.id);
    if (index !== -1) {
      this.predmety.splice(index, 1);
    }
  }
}
