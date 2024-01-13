import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MeModule } from './pages/me/me.module';
import { UsersModule } from './pages/users/users.module';
import { DeleteUserModule } from './pages/delete-user/delete-user.module';
import { FormsModule } from '@angular/forms';
import { UserModule } from './pages/user/user.module';

@NgModule({
  declarations: [],
  imports: [
    MeModule,
    DeleteUserModule,
    UserModule,
    UsersModule,
    FormsModule,
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
