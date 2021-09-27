import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLibRoutingModule } from './shared-lib-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AllUsersComponent } from './components/all-users/all-users.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ChangePasswordComponent,
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    SharedLibRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ChangePasswordComponent,
    AllUsersComponent
  ]
})
export class SharedLibModule { }
