import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFooterComponent } from '../../components/home-footer/home-footer.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page.component';



@NgModule({
  declarations: [
    HomePageComponent, 
    HomeFooterComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class HomePageModule { }
