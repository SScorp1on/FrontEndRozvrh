import {APP_INITIALIZER, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {HeaderComponent} from "./header/header.component";
import {MessagesComponent} from "./admin-dashboard/components/messages/messages.component";
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
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { TeacherListComponent } from './admin-dashboard/components/teacher/teacher-list/teacher-list.component';
import { TeacherAddComponent } from './admin-dashboard/components/teacher/teacher-add/teacher-add.component';
import { TeacherDetailComponent } from './admin-dashboard/components/teacher/teacher-detail/teacher-detail.component';
import { TeacherDeleteComponent } from './admin-dashboard/components/teacher/teacher-delete/teacher-delete.component';
import { ClassroomListComponent } from './admin-dashboard/components/classroom/classroom-list/classroom-list.component';
import { ClassroomAddComponent } from './admin-dashboard/components/classroom/classroom-add/classroom-add.component';
import { ClassroomDetailComponent } from './admin-dashboard/components/classroom/classroom-detail/classroom-detail.component';
import { ClassroomDeleteComponent } from './admin-dashboard/components/classroom/classroom-delete/classroom-delete.component';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {SubjectAddComponent} from "./admin-dashboard/components/subject/subject-add/subject-add.component";
import {SubjectListComponent} from "./admin-dashboard/components/subject/subject-list/subject-list.component";
import {SubjectDetailComponent} from "./admin-dashboard/components/subject/subject-detail/subject-detail.component";
import {SubjectDeleteComponent} from "./admin-dashboard/components/subject/subject-delete/subject-delete.component";
import {BackButtonDirective} from "./admin-dashboard/components/back-button.directive";
import {MatMenuModule} from "@angular/material/menu";
import { TimeblockListComponent } from './admin-dashboard/components/timeblock/timeblock-list/timeblock-list.component';
import { TimeblockAddComponent } from './admin-dashboard/components/timeblock/timeblock-add/timeblock-add.component';
import { TimeblockDetailComponent } from './admin-dashboard/components/timeblock/timeblock-detail/timeblock-detail.component';
import { TimeblockDeleteComponent } from './admin-dashboard/components/timeblock/timeblock-delete/timeblock-delete.component';
import { GroupListComponent } from './admin-dashboard/components/group/group-list/group-list.component';
import { GroupDetailComponent } from './admin-dashboard/components/group/group-detail/group-detail.component';
import { GroupDeleteComponent } from './admin-dashboard/components/group/group-delete/group-delete.component';
import { GroupAddComponent } from './admin-dashboard/components/group/group-add/group-add.component';
import {NullValidationHandler, OAuthModule, OAuthService} from "angular-oauth2-oidc";
import {AuthInterceptor} from "./auth/authInterceptor";
import {authCodeFlowConfig} from "./auth/AuthConfig";
import {KeycloakAngularModule} from "keycloak-angular";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CustomDataTimePipe} from "./admin-dashboard/components/pipes/customDataTime.pipe";
import { UserComponent } from './user/user/user.component';
import { UserTimeblockAddComponent } from './user/user/components/user-timeblock-add/user-timeblock-add.component';
import {MatStepperModule} from "@angular/material/stepper";
function init_app(oauthService: OAuthService) {
  return () => configureWithNewConfigApi(oauthService);
}

function configureWithNewConfigApi(oauthService: OAuthService) {
  oauthService.configure(authCodeFlowConfig);
  oauthService.tokenValidationHandler = new NullValidationHandler();
  oauthService.setupAutomaticSilentRefresh();
  oauthService.events.subscribe(e => { });
  return oauthService.loadDiscoveryDocumentAndTryLogin();

}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessagesComponent,
    FooterComponent,
    RozvrhComponent,
    TeacherListComponent,
    TeacherAddComponent,
    TeacherDetailComponent,
    TeacherDeleteComponent,
    ClassroomListComponent,
    ClassroomAddComponent,
    ClassroomDetailComponent,
    ClassroomDeleteComponent,
    AdminDashboardComponent,
    SubjectAddComponent,
    SubjectListComponent,
    SubjectDetailComponent,
    SubjectDeleteComponent,
    BackButtonDirective,
    TimeblockListComponent,
    TimeblockAddComponent,
    TimeblockDetailComponent,
    TimeblockDeleteComponent,
    GroupListComponent,
    GroupDetailComponent,
    GroupDeleteComponent,
    GroupAddComponent,
    CustomDataTimePipe,
    UserComponent,
    UserTimeblockAddComponent

  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
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
        MatTabsModule,
        MatProgressBarModule,
        MatMenuModule,
        KeycloakAngularModule,
        OAuthModule.forRoot(),
        MatProgressSpinnerModule,
        MatStepperModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      multi: true,
      deps: [OAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
