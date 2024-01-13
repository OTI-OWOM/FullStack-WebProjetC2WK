import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeFooterComponent } from '../../components/home-footer/home-footer.component';



@NgModule({
  declarations: [
    HomeComponent, 
    HomeFooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
