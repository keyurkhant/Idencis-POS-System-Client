import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLibRoutingModule } from './shared-lib-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedLibRoutingModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent
  ]
})
export class SharedLibModule { }
