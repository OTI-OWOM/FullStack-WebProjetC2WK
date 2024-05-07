import { Component, Input } from '@angular/core';
import { Company } from '@core/models/Company';

@Component({
  selector: 'app-company-create-modify',
  templateUrl: './company-create-modify.component.html',
  styleUrls: ['./company-create-modify.component.scss']
})
export class CompanyCreateModifyComponent {
  @Input() data: Partial<Company> = {} as Company;
}
