import {Component, OnInit} from '@angular/core';
import {Ucitel} from "../../models/ucitel.model";
import {UcitelService} from "../../services/ucitel.service";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-ucitel-formular',
  templateUrl: './ucitel-formular.component.html',
  styleUrls: ['./ucitel-formular.component.css']
})
export class UcitelFormularComponent implements OnInit{

  formular!: FormGroup

  ngOnInit(){
    this.formular = new FormGroup({
      fname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]/)]),
      lname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]/)]),
      cname: new FormControl('',[Validators.required, Validators.email])
    })
  }

  openSnackBar() {
    this._snackBar.open('Učitel bol pridan do zoznamu', 'OK',{ duration: 3000, horizontalPosition:'center',verticalPosition: 'bottom'});
  }
  fvalue = ''
  lvalue = ''
  cvalue = ''
  matcher = new MyErrorStateMatcher();
  constructor(private service: UcitelService, private _snackBar: MatSnackBar) {
  }


  teachers: Ucitel[] = []

  addTeacher(firstName: string,lastName: string,contact: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if(!firstName){return}
    if(!lastName){return}
    this.service.addTeacher({firstName,lastName,contact} as Ucitel).subscribe(teacher => {
      this.teachers.push(teacher)
    })
  }
}
