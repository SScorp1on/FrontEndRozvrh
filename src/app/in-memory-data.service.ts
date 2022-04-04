import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Predmet} from "./models/predmet.model";
import {Ucitel} from "./models/ucitel.model";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const predmety = [
      { id: 1, name: 'Multimedia' },
      { id: 2, name: 'Programovanie' },
      { id: 3, name: 'Webove technologie' },
      { id: 4, name: 'Celeritas' },
      { id: 5, name: 'Magneta' },
      { id: 6, name: 'RubberMan' },
      { id: 7, name: 'Dynama' },
      { id: 8, name: 'Dr IQ' },
      { id: 9, name: 'Magma' },
      { id: 10, name: 'Tornado' }
    ];
    return {predmety};
  }
  createDbTeachers(){
    const teachers = [
      { id: 1, firstName: 'Multimedia' },
      { id: 2, firstName: 'Programovanie' },
      { id: 3, firstName: 'Webove technologie' },
      { id: 4, firstName: 'Celeritas' },
      { id: 5, firstName: 'Magneta' },
      { id: 6, firstName: 'RubberMan' },
      { id: 7, firstName: 'Dynama' },
      { id: 8, firstName: 'Dr IQ' },
      { id: 9, firstName: 'Magma' },
      { id: 10, firstName: 'Tornado' }

    ];
    return {teachers};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(predmety: Predmet[]): number {
    return predmety.length > 0 ? Math.max(...predmety.map(predmet => predmet.id)) + 1 : 11;
  }
  genIdTeacher(teachers: Ucitel[]): number {
    return teachers.length > 0 ? Math.max(...teachers.map(teacher => teacher.id)) + 1 : 11;
  }
}
