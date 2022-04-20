import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Predmet} from "./models/predmet.model";
import {Ucitel} from "./models/ucitel.model";
import {Miestnost} from "./models/miestnost.model";
import {Rozvrh} from "./models/rozvrh.model";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataPredmetyService implements InMemoryDbService {
  createDb() {

    const rozvrhy = [
      {id: 1, day: 'Pondelok',time: '7:30-8:30',lastName: 'Vagac',predmetName: 'Wete3', ucebnaName: 'F-123'}
    ]
    return {rozvrhy}
    /*
    const miestnosty = [
      {id: 1, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 2, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 3, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 4, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 5, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 6, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 7, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 8, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 9, name: 'sadasd', computersProviding: true, address:'dasdasda'},
      {id: 10,name: 'sadasd', computersProviding: true, address:'dasdasda'},

    ]
    return{miestnosty}
*/
/*
    const teachers = [
      {id: 1, firstName: 'asdasdasd', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 2, firstName: 'asdasdasd', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 3, firstName: 'asdasdasd', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 4, firstName: 'ghfgdhfdgh', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 5, firstName: 'fgsdhgjhg', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 6, firstName: 'dsfgsdfgk', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 7, firstName: 'dsfgldf', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 8, firstName: 'sdas', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 9, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 10, firstName: 'sdas', lastName: 'sdas', contact: 'sdas@gmail.com'},
      {id: 11, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 12, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 13, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 14, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 15, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 16, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 17, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 18, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 19, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 20, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},
      {id: 21, firstName: 'sdas', lastName: 'sdas', contact: 'ssdas@gmail.com'},

    ]
    return{teachers}


    const predmety = [
      { id: 1, name: 'Multimedia', type: 'Vyberovy',computerRequired: true },
      { id: 2, name: 'Programovanie', type: 'Povinne-vyberovy',computerRequired: true },
      { id: 3, name: 'Webove technologie', type: 'Vyberovy',computerRequired: true},
      { id: 4, name: 'Celeritas', type: 'Povinny',computerRequired: false },
      { id: 5, name: 'Magneta', type: 'Povinne-vyberovy',computerRequired: false },
      { id: 6, name: 'RubberMan', type: 'Povinny',computerRequired: true },
      { id: 7, name: 'Dynama', type: 'Povinny',computerRequired: false },
      { id: 8, name: 'Dr IQ', type: 'Povinne-vyberovy',computerRequired: false },
      { id: 9, name: 'Magma', type: 'Vyberovy',computerRequired: true },
      { id: 10, name: 'Tornado', type: 'Povinne-vyberovy',computerRequired: true }
    ];
    return {predmety};

*/

  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
/*
  genId(predmety: Predmet[]): number {
    return predmety.length > 0 ? Math.max(...predmety.map(predmet => predmet.id)) + 1 : 11;
  }

/*
  genId(teachers: Ucitel[]): number {
    return teachers.length > 0 ? Math.max(...teachers.map(teacher => teacher.id)) + 1 : 11;
  }

*/



/*
  genId(miestnosty: Miestnost[]): number {
    return miestnosty.length > 0 ? Math.max(...miestnosty.map(miestnost => miestnost.id)) + 1 : 11;
  }

 */
genId(rozvrhy: Rozvrh[]): number {
  return rozvrhy.length > 0 ? Math.max(...rozvrhy.map(rozvrhy => rozvrhy.id)) + 1 : 11;
}





}
