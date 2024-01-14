import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeFooterComponent } from '../../components/home-footer/home-footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent, 
    HomeFooterComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class HomeModule { }
