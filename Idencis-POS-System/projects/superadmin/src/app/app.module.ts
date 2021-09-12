import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedLibModule } from 'projects/shared-lib/shared-lib.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
