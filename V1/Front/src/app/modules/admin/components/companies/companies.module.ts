import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CompaniesComponent
  ],
  exports: [
    CompaniesComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class CompaniesModule { }
