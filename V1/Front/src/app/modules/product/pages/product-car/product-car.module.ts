import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCarComponent } from './product-car/product-car.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductCarComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class ProductCarModule { }
