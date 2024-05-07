import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDisplayComponent } from './user-display/user-display.component';



@NgModule({
  declarations: [UserDisplayComponent],
  exports: [UserDisplayComponent],
  imports: [
    CommonModule
  ]
})
export class UserDisplayModule { }
