import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ucitel-stranka',
  templateUrl: './ucitel-stranka.component.html',
  styleUrls: ['./ucitel-stranka.component.css']
})
export class UcitelStrankaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

}
