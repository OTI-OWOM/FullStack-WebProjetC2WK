import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from './components/users/users.module';
import { CompaniesModule } from './components/companies/companies.module';


@NgModule({
  declarations: [],
  imports: [
    CompaniesModule,
    UsersModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
