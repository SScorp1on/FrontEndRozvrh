import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PredmetStrankaComponent} from "./predmet/predmet-stranka/predmet-stranka.component";
import {PredmetDetailComponent} from "./predmet/predmet-detail/predmet-detail.component";
import {UcitelStrankaComponent} from "./ucitel/ucitel-stranka/ucitel-stranka.component";
import {UcitelDetailComponent} from "./ucitel/ucitel-detail/ucitel-detail.component";
import {PredmetFormularComponent} from "./predmet/predmet-formular/predmet-formular.component";
import {UcitelFormularComponent} from "./ucitel/ucitel-formular/ucitel-formular.component";
import {MiestnostZoznamComponent} from "./miestnost/miestnost-zoznam/miestnost-zoznam.component";
import {MiestnostFormularComponent} from "./miestnost/miestnost-formular/miestnost-formular.component";
import {MiestnostDetailComponent} from "./miestnost/miestnost-detail/miestnost-detail.component";


const routes: Routes = [

  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
    {path: 'home', component: HomeComponent},
    {path: 'predmety', component: PredmetStrankaComponent},
    {path: 'predmety-formular', component: PredmetFormularComponent},
    {path: 'detail/predmety/:id', component: PredmetDetailComponent},
    {path: 'teachers', component: UcitelStrankaComponent},
    {path: 'teachers-formular', component: UcitelFormularComponent},
    {path: 'detail/teachers/:id', component: UcitelDetailComponent},
    {path: 'miestnosty', component: MiestnostZoznamComponent},
    {path: 'miestnosty-formular', component: MiestnostFormularComponent},
    {path: 'detail/miestnosty/:id', component: MiestnostDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
