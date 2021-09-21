import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'projects/shared-lib/components/change-password/change-password.component';
import { AuthGuard } from 'projects/shared-lib/guards/auth.guard';
import { LoggedInGuard } from 'projects/shared-lib/guards/logged-in.guard';
import { SharedLibModule } from 'projects/shared-lib/shared-lib.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MyprofileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedLibModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthGuard, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
