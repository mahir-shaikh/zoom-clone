import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RoomComponent } from './room/room.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RoomComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RoomComponent
  ]
})
export class ViewsModule { }
