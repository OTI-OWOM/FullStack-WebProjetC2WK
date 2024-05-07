import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCreationComponent } from './image-creation/image-creation.component';



@NgModule({
  declarations: [ImageCreationComponent],
  exports: [ImageCreationComponent],
  imports: [
    CommonModule
  ]
})
export class ImageCreationModule { }
