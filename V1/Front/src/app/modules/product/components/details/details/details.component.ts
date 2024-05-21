import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CarDetail } from '@core/models/Details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @ViewChild('detailNameInput') detailNameInput!: ElementRef;
  @Output() messageChange = new EventEmitter<string>();
  @Input() carDetails: Partial<CarDetail>[] = [];
  @Output() carDetailsChange = new EventEmitter<Partial<CarDetail>[]>();
  carDetailName: string = '';
  carDetailValue: string = '';

  addCarDetail() {
    if (this.carDetailName && this.carDetailValue) {
      if (!this.carDetails) {
        this.carDetails = [];
      }

      this.carDetails.push({
        DetailName: this.carDetailName,
        DetailValue: this.carDetailValue
      });

      this.carDetailsChange.emit(this.carDetails);
      // Reset fields after addition
      this.carDetailName = '';
      this.carDetailValue = '';

      this.detailNameInput.nativeElement.focus();
    } else {
      this.messageChange.emit('Please fill in all car detail fields.');
    }
  }
}
