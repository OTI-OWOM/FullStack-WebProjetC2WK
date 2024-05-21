import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserDisplayModule } from '../../components/user-display/user-display.module';
import { MessageModule } from '@ui/message/message.module';
import { FormsModule } from '@angular/forms';
import { UserCreateModifyModule } from '../../components/user-create-modify/user-create-modify.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    MessageModule,
    FormsModule,
    UserCreateModifyModule,
    RouterModule,
    UserDisplayModule,
    MessageModule,
    CommonModule
  ]
})
export class UserModule { }
