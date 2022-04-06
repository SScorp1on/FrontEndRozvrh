import {Component} from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";

@Component({
  selector: 'app-ucitel-formular',
  templateUrl: './ucitel-formular.component.html',
  styleUrls: ['./ucitel-formular.component.css']
})
export class UcitelFormularComponent {

  constructor(private service: UcitelService) {
  }

  teachers: Ucitel[] = []

  addTeacher(firstName: string,lastName: string,contact: string): void {
    firstName = firstName.trim()
    lastName = lastName.trim()
    contact = contact.trim()
    if(!firstName){return}
    if(!lastName){return}
    this.service.addTeacher({firstName,lastName,contact} as Ucitel).subscribe(teacher => {
      this.teachers.push(teacher)
    })
  }
}
