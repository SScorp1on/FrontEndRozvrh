import { Component, OnInit } from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UcitelService} from "../../services/ucitel.service";

@Component({
  selector: 'app-ucitel-detail',
  templateUrl: './ucitel-detail.component.html',
  styleUrls: ['./ucitel-detail.component.css']
})
export class UcitelDetailComponent implements OnInit {
  teacher: Ucitel |  undefined;

  constructor(
    private route: ActivatedRoute,
    private ucitelService: UcitelService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPredmet();
  }

  getPredmet(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.ucitelService.getTeacher(id)
      .subscribe(teacher => this.teacher = teacher);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.teacher) {
      this.ucitelService.updateTeacher(this.teacher)
        .subscribe(() => this.goBack());
    }
  }
}
