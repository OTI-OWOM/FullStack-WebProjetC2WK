import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductComponent } from './create-product/create-product.component';
import { MessageModule } from '@ui/message/message.module';
import { ProductsListModule } from 'src/app/modules/product/components/products-list/products-list.module';
import { FormsModule } from '@angular/forms';
import { DetailsModule } from 'src/app/modules/product/components/details/details.module';
import { ImageCreationModule } from '../../components/image-creation/image-creation.module';



@NgModule({
  declarations: [
    CreateProductComponent
  ],
  imports: [
    ImageCreationModule,
    DetailsModule,
    FormsModule,
    ProductsListModule,
    MessageModule,
    CommonModule
  ]
})
export class CreateProductModule { }
