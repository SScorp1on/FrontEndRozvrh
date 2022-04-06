import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-predmet-stranka',
  templateUrl: './predmet-stranka.component.html',
  styleUrls: ['./predmet-stranka.component.scss']
})
export class PredmetStrankaComponent implements OnInit {



  constructor(private router: Router, private http: HttpClient) { }

 ngOnInit(): void {
    /*console.log('1');
    const vysledok: Observable<Predmet[]> = this.http.get<Predmet[]>('http://localhost:8080/api/predmety');
    vysledok.subscribe(data => {
      console.log('prislo:' + data);
    });
    console.log('2');
    */

  }

  chodSpat(): void {
    this.router.navigate(['']);
  }

}
