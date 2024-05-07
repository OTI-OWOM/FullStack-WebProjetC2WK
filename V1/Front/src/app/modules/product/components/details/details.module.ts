import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DetailsComponent],
  exports: [DetailsComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class DetailsModule { }
