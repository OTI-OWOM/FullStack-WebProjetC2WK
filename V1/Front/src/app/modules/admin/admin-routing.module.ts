import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page/admin-page.component';
import { CompanyComponent } from './pages/company/company/company.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: 'company/:id', component: CompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
