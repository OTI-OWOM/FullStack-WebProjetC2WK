import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-panel',
  templateUrl: './delete-panel.component.html',
  styleUrls: ['./delete-panel.component.scss']
})
export class DeletePanelComponent {
  @Output() deleteButtonClicked = new EventEmitter<void>();
  @Input() message: string = "";

  onDeleteButtonClick(): void {
    // Emit the event when the button is clicked
    this.deleteButtonClicked.emit();
    this.message = "Deleted!";
  }
}
