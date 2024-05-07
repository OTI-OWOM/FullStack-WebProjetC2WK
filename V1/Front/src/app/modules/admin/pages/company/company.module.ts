import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { MessageModule } from '@ui';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyCreateModifyModule } from '../../components/company-create-modify/company-create-modify.module';
import { CompanyDisplayModule } from '../../components/company-display/company-display.module';



@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    MessageModule,
    FormsModule,
    CompanyCreateModifyModule,
    RouterModule,
    CompanyDisplayModule,
    CommonModule
  ]
})
export class CompanyModule { }
