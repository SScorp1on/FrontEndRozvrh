import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { PredmetFormularComponent } from './predmet/predmet-formular/predmet-formular.component';
import { PredmetStrankaComponent } from './predmet/predmet-stranka/predmet-stranka.component';
import { PredmetZoznamComponent } from './predmet/predmet-zoznam/predmet-zoznam.component';
import { UcitelFormularComponent } from './ucitel/ucitel-formular/ucitel-formular.component';
import { UcitelStrankaComponent } from './ucitel/ucitel-stranka/ucitel-stranka.component';
import { UcitelZoznamComponent } from './ucitel/ucitel-zoznam/ucitel-zoznam.component';
import { MiestnostFormularComponent } from './miestnost/miestnost-formular/miestnost-formular.component';
import { MiestnostStrankaComponent } from './miestnost/miestnost-stranka/miestnost-stranka.component';
import { MiestnostZoznamComponent } from './miestnost/miestnost-zoznam/miestnost-zoznam.component';
import { MenuComponent } from './menu/menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from './messages/messages.component';
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    AppComponent,
    PredmetFormularComponent,
    PredmetStrankaComponent,
    PredmetZoznamComponent,
    UcitelFormularComponent,
    UcitelStrankaComponent,
    UcitelZoznamComponent,
    MiestnostFormularComponent,
    MiestnostStrankaComponent,
    MiestnostZoznamComponent,
    MenuComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    NgbModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
