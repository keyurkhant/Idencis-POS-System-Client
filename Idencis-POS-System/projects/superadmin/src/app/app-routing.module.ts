import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from 'projects/shared-lib/components/all-users/add-edit-user/add-edit-user.component';
import { AllUsersComponent } from 'projects/shared-lib/components/all-users/all-users.component';
import { LoginComponent } from 'projects/shared-lib/components/login/login.component';
import { AuthGuard } from 'projects/shared-lib/guards/auth.guard';
import { LoggedInGuard } from 'projects/shared-lib/guards/logged-in.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'profile',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',    
    canActivate : [AuthGuard],
    children:[
      {
        path : '',
        component : AllUsersComponent
      },
      {
        path : 'add-user',
        component : AddEditUserComponent,
        canActivate : [AuthGuard]
      },      
      {
        path: 'user-details/:username',
        component : AddEditUserComponent,
        canActivate : [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
