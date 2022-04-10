import { Component } from '@angular/core';
import {Router} from "@angular/router";
enum MENU { PREDMETY, UCITELIA }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  menu = MENU
  constructor(private router: Router) {
  }


  otvorMenu(m: MENU){
    if (m == MENU.PREDMETY) {
      this.router.navigate(['/predmety']);
    }
    if (m == MENU.UCITELIA) {
      this.router.navigate(['/teachers']);
    }
  }
  chodSpat(): void {
    this.router.navigate(['']);
  }

}
