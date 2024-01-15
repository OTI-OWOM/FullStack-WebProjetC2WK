import { Component } from '@angular/core';
import { Company } from '@core/models/Company';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
  private subscription: Subscription = new Subscription();

  companyList!: Company[];

  constructor(private company_service: CompanyService) { }

  ngOnInit(): void {
      this.company_service.getAllCompanies().subscribe((response: Company[]) => {
          this.companyList = response;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
