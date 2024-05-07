import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductsListComponent],
  exports: [ProductsListComponent],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class ProductsListModule { }
