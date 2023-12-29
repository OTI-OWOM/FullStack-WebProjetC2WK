import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductComponent } from './components/partials/product/product.component';
import { UsersComponent } from './components/pages/users/users.component';
import { ConnectionComponent } from './components/pages/connection/connection.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MeComponent } from './components/pages/me/me.component';
import { ModifyUserComponent } from './components/partials/modify-user/modify-user.component';
import { DeleteUserComponent } from './components/partials/delete-user/delete-user.component';
import { UserComponent } from './components/pages/user/user.component';
import { AuthGuard } from './services/auth.guard';
import { UserProductsComponent } from './components/pages/user-products/user-products.component';
import { CreateProductComponent } from './components/pages/create-product/create-product.component';
import { DeleteProductComponent } from './components/pages/delete-product/delete-product.component';
import { ModifyProductComponent } from './components/partials/modify-product/modify-product.component';
import { HomeComponent } from './components/pages/home/home.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LegalComponent } from './components/pages/legal/legal.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'legal', component: LegalComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'products/:user', component: UserProductsComponent, canActivate: [AuthGuard] },
    { path: 'newproduct/create', component: CreateProductComponent, canActivate: [AuthGuard] },
    { path: 'product/delete/:id', component: DeleteProductComponent, canActivate: [AuthGuard] },
    { path: 'product/modify/:id', component: ModifyProductComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'login', component: ConnectionComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: SignupComponent },
    { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
    { path: 'modify', component: ModifyUserComponent, canActivate: [AuthGuard] },
    { path: 'user/delete/:id', component: DeleteUserComponent, canActivate: [AuthGuard] },
    { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'user/notloggedin', component: UserComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: Error404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash : true } )],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
