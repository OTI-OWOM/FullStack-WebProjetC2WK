import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  showUsers: boolean = true;
  showCompanies: boolean = false;

  toggleUsers(): void {
    this.showUsers = true;
    this.showCompanies = false;
  }

  toggleCompanies(): void {
    this.showUsers = false;
    this.showCompanies = true;
  }
}
