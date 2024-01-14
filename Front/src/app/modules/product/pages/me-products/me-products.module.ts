import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeProductsComponent } from './me-products/me-products.component';
import { ProductsListModule } from '../../components/products-list/products-list.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MeProductsComponent
  ],
  imports: [
    ProductsListModule,
    FormsModule,
    CommonModule
  ]
})
export class MeProductsModule { }
