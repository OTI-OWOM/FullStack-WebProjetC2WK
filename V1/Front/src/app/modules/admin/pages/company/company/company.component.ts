import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '@core/models/Company';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  protected subscription: Subscription = new Subscription();
  protected role: boolean = false;

  protected companyID!: string;
  protected data: Partial<Company> = {} as Company;

  protected title: string = "";
  protected isMe: boolean = true;
  
  isEditMode: boolean = false;
  
  message: string = "";

  constructor(
      protected companyService: CompanyService,
      protected router: Router,
      public route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
          this.companyID = params['id'];
      }
  });
  }

  ngOnInit(): void {
      this.subscription.add(
          this.companyService
              .getCompany(this.companyID)
              .subscribe((res) => {
                  this.data = res;
                  this.title = this.data.Name!;
              }),
      );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  userDelete(): void {
      this.router.navigateByUrl(`account/user/delete/${this.companyID}`);
  }

  toggleEditMode(): void {
      this.isEditMode = !this.isEditMode;
  }
  
  createProduct(): void {
      this.router.navigateByUrl('product/create');
  }

  userModify() {
      if (this.isEditMode) {
          this.subscription.add(
              this.companyService
                  .modifyCompany(
                    this.companyID,
                      this.data
                  )
                  .subscribe((res: any) => {
                      if (res) {
                          this.message = res.message;
                      }
                  }),
          );
          this.toggleEditMode();
      }
  }
}
