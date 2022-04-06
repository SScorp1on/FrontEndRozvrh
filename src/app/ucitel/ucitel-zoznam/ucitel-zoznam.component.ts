import { Component, OnInit } from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";

@Component({
  selector: 'app-ucitel-zoznam',
  templateUrl: './ucitel-zoznam.component.html',
  styleUrls: ['./ucitel-zoznam.component.css']
})
export class UcitelZoznamComponent implements OnInit {


  teachers: Ucitel[] = []
  constructor(private service: UcitelService) {
  }
  ngOnInit(): void{
    this.getTeachers()
  }

  getTeachers(): void{
    this.service.getTeachers().subscribe(teachers => this.teachers = teachers)
  }


  delete(teacher: Ucitel): void {
    this.teachers = this.teachers.filter(t => t !== teacher)
    this.service.deleteTeacher(teacher.id).subscribe()
  }
}
