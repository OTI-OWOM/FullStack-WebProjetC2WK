import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { MessageModule } from '@ui/message/message.module';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    MessageModule,
    CommonModule
  ]
})
export class SignupModule { }
