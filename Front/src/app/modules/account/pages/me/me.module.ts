import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me/me.component';
import { MessageModule } from '@ui';
import { UserDisplayModule } from '../../components/user-display/user-display.module';
import { RouterModule } from '@angular/router';
import { UserCreateModifyModule } from '../../components/user-create-modify/user-create-modify.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    MessageModule,
    FormsModule,
    UserCreateModifyModule,
    RouterModule,
    UserDisplayModule,
    CommonModule
  ]
})
export class MeModule { }
