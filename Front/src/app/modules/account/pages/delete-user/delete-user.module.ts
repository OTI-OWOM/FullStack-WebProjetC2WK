import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DeletePanelModule } from 'src/app/shared/ui/delete-panel/delete-panel.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteUserComponent
  ],
  imports: [
    FormsModule,
    DeletePanelModule,
    CommonModule
  ]
})
export class DeleteUserModule { }
