import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from 'projects/superadmin/src/app/components/myprofile/myprofile.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedLibRoutingModule { }
