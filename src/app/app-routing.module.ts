import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PredmetStrankaComponent} from "./predmet/predmet-stranka/predmet-stranka.component";
import {UcitelStrankaComponent} from "./ucitel/ucitel-stranka/ucitel-stranka.component";
import {MiestnostZoznamComponent} from "./miestnost/miestnost-zoznam/miestnost-zoznam.component";
import {RozvrhZoznamComponent} from "./rozvrh/rozvrh-zoznam/rozvrh-zoznam.component";


const routes: Routes = [

  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
    {path: 'home', component: HomeComponent},
    {path: 'predmety', component: PredmetStrankaComponent},
    {path: 'teachers', component: UcitelStrankaComponent},
    {path: 'ucebny', component: MiestnostZoznamComponent},
    {path: 'rozvrhy', component: RozvrhZoznamComponent},
   // {path: 'detail/rozvrhy/:id', component: Roz},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
