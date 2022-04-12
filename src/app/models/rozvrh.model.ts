import {Predmet} from "./predmet.model";
import {Miestnost} from "./miestnost.model";
import {Ucitel} from "./ucitel.model";
import {Dni} from "./dni.model";

export interface Rozvrh extends Predmet, Miestnost, Ucitel{
  dni: [Dni.Pondelok, Dni.Utorok,Dni.Streda,Dni.stvrtok,Dni.Piatok]
}
