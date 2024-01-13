import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {
  @Input() message: string = '';
  showMessage: boolean = false;

  ngOnChanges(): void {
    if (this.message) {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    }
  }
}
