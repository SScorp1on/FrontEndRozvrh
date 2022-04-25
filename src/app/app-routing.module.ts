import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RozvrhZoznamComponent} from "./rozvrh/rozvrh-zoznam/rozvrh-zoznam.component";
import {TeacherListComponent} from "./admin-dashboard/components/teacher/teacher-list/teacher-list.component";
import {ClassroomListComponent} from "./admin-dashboard/components/classroom/classroom-list/classroom-list.component";
import {SubjectListComponent} from "./admin-dashboard/components/subject/subject-list/subject-list.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";


const routes: Routes = [

  {
    path: '', redirectTo: '/admin-dashboard', pathMatch: 'full'
  },
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'subjects', component: SubjectListComponent},
    {path: 'teachers', component: TeacherListComponent},
    {path: 'classrooms', component: ClassroomListComponent},
    {path: 'rozvrh', component: RozvrhZoznamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
