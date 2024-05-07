import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageModule } from './pages/admin-page/admin-page.module';
import { CompanyModule } from './pages/company/company.module';


@NgModule({
  declarations: [],
  imports: [
    CompanyModule,
    AdminPageModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
