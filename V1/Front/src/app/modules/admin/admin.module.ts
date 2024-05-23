import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageModule } from './pages/admin-page/admin-page.module';


@NgModule({
  declarations: [],
  imports: [
    AdminPageModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
