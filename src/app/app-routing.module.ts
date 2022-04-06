import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PredmetStrankaComponent} from "./predmet/predmet-stranka/predmet-stranka.component";
import {PredmetDetailComponent} from "./predmet/predmet-detail/predmet-detail.component";
import {UcitelStrankaComponent} from "./ucitel/ucitel-stranka/ucitel-stranka.component";
import {UcitelDetailComponent} from "./ucitel/ucitel-detail/ucitel-detail.component";


const routes: Routes = [

  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
    {path: 'home', component: HomeComponent},
    {path: 'predmety', component: PredmetStrankaComponent},
    {path: 'detail/predmety/:id', component: PredmetDetailComponent},
    {path: 'teachers', component: UcitelStrankaComponent},
    {path: 'detail/teachers/:id', component: UcitelDetailComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
