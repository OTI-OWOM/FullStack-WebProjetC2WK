import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductsComponent } from './user-products/user-products.component';
import { FormsModule } from '@angular/forms';
import { ProductsListModule } from 'src/app/modules/product/components/products-list/products-list.module';



@NgModule({
  declarations: [
    UserProductsComponent,
  ],
  imports: [
    ProductsListModule,
    FormsModule,
    CommonModule
  ]
})
export class UserProductsModule { }
