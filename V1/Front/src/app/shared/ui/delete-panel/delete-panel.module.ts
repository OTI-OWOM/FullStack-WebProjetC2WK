import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePanelComponent } from './delete-panel/delete-panel.component';



@NgModule({
  declarations: [
    DeletePanelComponent
  ],
  exports: [
    DeletePanelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DeletePanelModule { }
