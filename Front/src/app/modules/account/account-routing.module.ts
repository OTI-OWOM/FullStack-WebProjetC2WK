import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from './pages/me/me/me.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { DeleteUserComponent } from './pages/delete-user/delete-user/delete-user.component';
import { UserComponent } from './pages/user/user/user.component';
import { UsersComponent } from './pages/users/users/users.component';

const routes: Routes = [
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'user/delete/:id', component: DeleteUserComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/notloggedin', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
