import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UsersModule } from '../../components/users/users.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    FormsModule,
    UsersModule,
    CommonModule
  ]
})
export class AdminPageModule { }
