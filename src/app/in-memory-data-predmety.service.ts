import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Predmet} from "./models/predmet.model";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataPredmetyService implements InMemoryDbService {
  createDb() {
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

  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(predmety: Predmet[]): number {
    return predmety.length > 0 ? Math.max(...predmety.map(predmet => predmet.id)) + 1 : 11;
  }
}
