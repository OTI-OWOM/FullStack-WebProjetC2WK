import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from './pages/users/users.module';


@NgModule({
  declarations: [],
  imports: [
    UsersModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
