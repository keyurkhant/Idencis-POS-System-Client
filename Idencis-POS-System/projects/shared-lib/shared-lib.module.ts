import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLibRoutingModule } from './shared-lib-routing.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedLibRoutingModule
  ],
  exports: [
    CommonModule,
    LoginComponent
  ]
})
export class SharedLibModule { }
