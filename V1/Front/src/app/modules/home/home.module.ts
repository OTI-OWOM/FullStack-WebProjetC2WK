import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageModule } from './pages/home/home-page.module';

@NgModule({
  declarations: [],
  imports: [
    HomePageModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
