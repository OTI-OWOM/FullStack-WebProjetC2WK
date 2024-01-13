import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateModifyComponent } from './user-create-modify/user-create-modify.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserCreateModifyComponent],
  exports: [UserCreateModifyComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class UserCreateModifyModule { }
