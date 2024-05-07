import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DeletePanelModule } from 'src/app/shared/ui/delete-panel/delete-panel.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteProductComponent,
  ],
  imports: [
    FormsModule,
    DeletePanelModule,
    CommonModule
  ]
})
export class DeleteProductModule { }
