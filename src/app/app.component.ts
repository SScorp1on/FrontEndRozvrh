import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms"
 enum MENU { PREDMETY, UCITELIA }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndRozvrh';

  menu = MENU
  constructor(private router: Router) {
  }



  otvorMenu(m: MENU){
    if (m == MENU.PREDMETY) {
      this.router.navigate(['predmety']);
    }
    if (m == MENU.UCITELIA) {
      this.router.navigate(['ucitelia']);
    }
  }
}
