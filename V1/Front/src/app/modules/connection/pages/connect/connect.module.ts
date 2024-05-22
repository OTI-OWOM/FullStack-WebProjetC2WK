import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './connect/connect.component';
import { RouterModule } from '@angular/router';

import { MessageModule } from '@ui/message/message.module';



@NgModule({
  declarations: [
    ConnectComponent
  ],
  imports: [
    MessageModule,
    RouterModule,
    CommonModule
  ]
})
export class ConnectModule { }
