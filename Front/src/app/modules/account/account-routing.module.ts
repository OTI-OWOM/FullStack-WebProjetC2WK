import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from './pages/me/me/me.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user/delete-user.component';
import { UserComponent } from './pages/user/user/user.component';
import { UsersComponent } from './pages/users/users/users.component';

const routes: Routes = [
  { path: 'me', component: MeComponent },
  { path: 'user/delete/:id', component: DeleteUserComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/notloggedin', component: UserComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
