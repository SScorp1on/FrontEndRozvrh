import {HeaderComponent} from "./components/header/header.component";
import {PredmetDetailComponent} from "./components/predmet/predmet-detail/predmet-detail.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {PredmetZoznamComponent} from "./components/predmet/predmet-zoznam/predmet-zoznam.component";
import {PredmetFormularComponent} from "./components/predmet/predmet-formular/predmet-formular.component";
import {UcitelFormularComponent} from "./components/ucitel/ucitel-formular/ucitel-formular.component";
import {UcitelStrankaComponent} from "./components/ucitel/ucitel-stranka/ucitel-stranka.component";
import {UcitelZoznamComponent} from "./components/ucitel/ucitel-zoznam/ucitel-zoznam.component";
import {PredmetStrankaComponent} from "./components/predmet/predmet-stranka/predmet-stranka.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {HomeComponent} from "./components/home/home.component";
import {UcitelDetailComponent} from "./components/ucitel/ucitel-detail/ucitel-detail.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataPredmetyService} from "./components/in-memory-data-predmety.service";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    HeaderComponent,
    PredmetDetailComponent,
    AdminDashboardComponent,
    PredmetFormularComponent,
    PredmetZoznamComponent,
    PredmetStrankaComponent,
    UcitelFormularComponent,
    UcitelStrankaComponent,
    UcitelZoznamComponent,
    UcitelDetailComponent,
    MessagesComponent,
    HomeComponent,
  ],
  imports: [
    AdminRoutingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataPredmetyService, {dataEncapsulation: false}
    ),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class AdminModule { }
