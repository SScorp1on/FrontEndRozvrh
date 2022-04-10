import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-predmet-stranka',
  templateUrl: './predmet-stranka.component.html',
  styleUrls: ['./predmet-stranka.component.scss']
})
export class PredmetStrankaComponent {


  constructor(private router: Router) { }

  chodSpat(): void {
    this.router.navigate(['/home']);
  }

}
