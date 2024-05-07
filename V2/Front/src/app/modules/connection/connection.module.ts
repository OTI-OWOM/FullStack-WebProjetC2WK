import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectModule } from './pages/connect/connect.module';
import { SignupModule } from './pages/signup/signup.module';
import { LogoutModule } from './pages/logout/logout.module';


@NgModule({
  declarations: [],
  imports: [
    ConnectModule,
    SignupModule,
    LogoutModule,
    CommonModule,
    ConnectionRoutingModule
  ]
})
export class ConnectionModule { }
