import { Component } from '@angular/core';
import { Router } from "@angular/router";

enum MENU { PREDMETY, UCITELIA }

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menu = MENU
  constructor(private router: Router) { }

  otvorMenu(m: MENU){
    if(m === MENU.PREDMETY){
      this.router.navigate(['predmety'])
    }
  }

}
