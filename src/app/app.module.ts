import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
