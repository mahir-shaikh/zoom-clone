import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CallComponent } from './call/call.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CallComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CallComponent
  ]
})
export class ViewsModule { }
