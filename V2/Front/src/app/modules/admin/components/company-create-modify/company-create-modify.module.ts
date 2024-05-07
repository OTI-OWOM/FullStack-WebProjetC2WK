import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyCreateModifyComponent } from './company-create-modify/company-create-modify.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanyCreateModifyComponent
  ],
  exports: [
    CompanyCreateModifyComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CompanyCreateModifyModule { }
