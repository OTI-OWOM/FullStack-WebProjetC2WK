import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyProductComponent } from './modify-product/modify-product.component';
import { FormsModule } from '@angular/forms';
import { DetailsModule } from 'src/app/modules/product/components/details/details.module';
import { ImageCreationModule } from '../../components/image-creation/image-creation.module';
import { ProductsListModule } from '../../components/products-list/products-list.module';
import { MessageModule } from '@ui';



@NgModule({
  declarations: [ModifyProductComponent],
  imports: [
    MessageModule,
    ImageCreationModule,
    DetailsModule,
    ProductsListModule,
    FormsModule,
    CommonModule
  ]
})
export class ModifyProductModule { }
