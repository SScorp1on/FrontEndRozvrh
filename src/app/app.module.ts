import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {PredmetDetailComponent} from "./predmet/predmet-detail/predmet-detail.component";
import {PredmetFormularComponent} from "./predmet/predmet-formular/predmet-formular.component";
import {DialogPredmetConfirmationComponent, PredmetZoznamComponent} from "./predmet/predmet-zoznam/predmet-zoznam.component";
import {PredmetStrankaComponent} from "./predmet/predmet-stranka/predmet-stranka.component";
import {UcitelFormularComponent} from "./ucitel/ucitel-formular/ucitel-formular.component";
import {UcitelStrankaComponent} from "./ucitel/ucitel-stranka/ucitel-stranka.component";
import {DialogUcitelConfirmationComponent, UcitelZoznamComponent} from "./ucitel/ucitel-zoznam/ucitel-zoznam.component";
import {UcitelDetailComponent} from "./ucitel/ucitel-detail/ucitel-detail.component";
import {HeaderComponent} from "./header/header.component";
import {MessagesComponent} from "./messages/messages.component";
import {HomeComponent} from "./home/home.component";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataPredmetyService} from "./in-memory-data-predmety.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { FooterComponent } from './footer/footer.component';
import { RozvrhComponent } from './rozvrh/rozvrh.component';
import {DialogMiestnostConfirmationComponent, MiestnostZoznamComponent} from "./miestnost/miestnost-zoznam/miestnost-zoznam.component";
import {MiestnostStrankaComponent} from "./miestnost/miestnost-stranka/miestnost-stranka.component";
import {MiestnostFormularComponent} from "./miestnost/miestnost-formular/miestnost-formular.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MiestnostDetailComponent} from "./miestnost/miestnost-detail/miestnost-detail.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import { RozvrhFormularComponent } from './rozvrh/rozvrh-formular/rozvrh-formular.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PredmetDetailComponent,
    PredmetFormularComponent,
    PredmetZoznamComponent,
    PredmetStrankaComponent,
    UcitelFormularComponent,
    UcitelStrankaComponent,
    UcitelZoznamComponent,
    UcitelDetailComponent,
    MessagesComponent,
    HomeComponent,
    FooterComponent,
    RozvrhComponent,
    MiestnostZoznamComponent,
    MiestnostStrankaComponent,
    MiestnostFormularComponent,
    MiestnostDetailComponent,
    DialogPredmetConfirmationComponent,
    DialogUcitelConfirmationComponent,
    DialogMiestnostConfirmationComponent,
    RozvrhFormularComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
      //   HttpClientInMemoryWebApiModule.forRoot(
           //     InMemoryDataPredmetyService, {dataEncapsulation: false}
       //  ),
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
        MatGridListModule,
        MatSortModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatCardModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
