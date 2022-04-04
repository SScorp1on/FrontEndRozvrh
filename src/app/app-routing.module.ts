import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PredmetStrankaComponent} from "./predmet/predmet-stranka/predmet-stranka.component";
import {UcitelStrankaComponent} from "./ucitel/ucitel-stranka/ucitel-stranka.component";
import {AppComponent} from "./app.component";

const routes: Routes = [

  {
    path: 'predmety',
    component: PredmetStrankaComponent
  },
  {
    path: 'ucitelia',
    component: UcitelStrankaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
