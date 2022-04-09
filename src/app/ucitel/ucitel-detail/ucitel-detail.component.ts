import { Component, OnInit } from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UcitelService} from "../../services/ucitel.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../ucitel-formular/ucitel-formular.component";

@Component({
  selector: 'app-ucitel-detail',
  templateUrl: './ucitel-detail.component.html',
  styleUrls: ['./ucitel-detail.component.scss']
})
export class UcitelDetailComponent implements OnInit {
  teacher: Ucitel |  undefined;

  constructor(
    private route: ActivatedRoute,
    private ucitelService: UcitelService,
    private location: Location
  ) {}
  formular!: FormGroup
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.getTeacher();
    this.formular = new FormGroup({
      fname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]/)]),
      lname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]/)]),
      cname: new FormControl('',[Validators.required, Validators.email])
    })
  }

  getTeacher(): void {
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
