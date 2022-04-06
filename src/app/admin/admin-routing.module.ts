import {PredmetDetailComponent} from "./components/predmet/predmet-detail/predmet-detail.component";
import {UcitelDetailComponent} from "./components/ucitel/ucitel-detail/ucitel-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {NgModule} from "@angular/core";
import {PredmetStrankaComponent} from "./components/predmet/predmet-stranka/predmet-stranka.component";
import {UcitelStrankaComponent} from "./components/ucitel/ucitel-stranka/ucitel-stranka.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    children: [
      {path: 'predmety', component: PredmetStrankaComponent},
      {path: 'detail/predmety/:id', component: PredmetDetailComponent},
      {path: 'teachers', component: UcitelStrankaComponent},
      {path: 'detail/teachers/:id', component: UcitelDetailComponent},
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
  ]
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
