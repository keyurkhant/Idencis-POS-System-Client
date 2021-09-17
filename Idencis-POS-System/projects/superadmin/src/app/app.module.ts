import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedLibModule } from 'projects/shared-lib/shared-lib.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    MyprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedLibModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
