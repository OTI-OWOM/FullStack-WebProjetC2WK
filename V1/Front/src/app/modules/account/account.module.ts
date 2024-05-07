import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MeModule } from './pages/me/me.module';
import { DeleteUserModule } from './pages/delete-user/delete-user.module';
import { UserModule } from './pages/user/user.module';

@NgModule({
  declarations: [],
  imports: [
    MeModule,
    DeleteUserModule,
    UserModule,
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
