import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'projects/shared-lib/components/login/login.component';
import { AuthGuard } from 'projects/shared-lib/guards/auth.guard';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'admin',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
