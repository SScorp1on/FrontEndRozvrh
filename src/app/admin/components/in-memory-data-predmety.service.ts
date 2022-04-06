import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Predmet} from "./models/predmet.model";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataPredmetyService implements InMemoryDbService {
  createDb() {
    const predmety = [
      { id: 1, name: 'Multimedia', type: 'CVICENIE',computerRequired: 'true' },
      { id: 2, name: 'Programovanie', type: 'PREDNASKA',computerRequired: 'true' },
      { id: 3, name: 'Webove technologie', type: 'CVICENIE',computerRequired: 'true' },
      { id: 4, name: 'Celeritas', type: 'CVICENIE',computerRequired: 'false' },
      { id: 5, name: 'Magneta', type: 'CVICENIE',computerRequired: 'false' },
      { id: 6, name: 'RubberMan', type: 'PREDNASKA',computerRequired: 'true' },
      { id: 7, name: 'Dynama', type: 'CVICENIE',computerRequired: 'false' },
      { id: 8, name: 'Dr IQ', type: 'PREDNASKA',computerRequired: 'false' },
      { id: 9, name: 'Magma', type: 'CVICENIE',computerRequired: 'true' },
      { id: 10, name: 'Tornado', type: 'CVICENIE',computerRequired: 'true' }
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
