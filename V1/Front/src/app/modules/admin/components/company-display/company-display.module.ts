import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDisplayComponent } from './company-display/company-display.component';



@NgModule({
  declarations: [
    CompanyDisplayComponent
  ],
  exports: [
    CompanyDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompanyDisplayModule { }
