import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
enum MENU { PREDMETY, UCITELIA }
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

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
  chodSpat(): void {
    this.router.navigate(['']);
  }
}
