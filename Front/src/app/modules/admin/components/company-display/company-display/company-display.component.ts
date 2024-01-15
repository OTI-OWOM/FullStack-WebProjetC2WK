import { Component, Input } from '@angular/core';
import { Company } from '@core/models/Company';

@Component({
  selector: 'app-company-display',
  templateUrl: './company-display.component.html',
  styleUrls: ['./company-display.component.scss']
})
export class CompanyDisplayComponent {
  @Input() data: Partial<Company> = {} as Company;
}
