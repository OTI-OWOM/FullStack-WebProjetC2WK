import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout/logout.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { ConnectComponent } from './pages/connect/connect/connect.component';

const routes: Routes = [
  { path: 'login', component: ConnectComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionRoutingModule { }
