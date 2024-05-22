import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';

import { MessageModule } from '@ui/message/message.module';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    MessageModule,
    RouterModule,
    CommonModule
  ]
})
export class SignupModule { }
