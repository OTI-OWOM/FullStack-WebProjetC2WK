import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsListModule } from 'src/app/modules/product/components/products-list/products-list.module';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    ProductsListModule,
    RouterModule,
    FormsModule,
    CommonModule
  ]
})
export class ProductsModule { }
