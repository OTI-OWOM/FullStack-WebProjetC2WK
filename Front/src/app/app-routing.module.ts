import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductsComponent } from './components/pages/products/products.component';
// import { ProductComponent } from './components/pages/product/product.component';
// import { UsersComponent } from './modules/user/pages/users/users/users.component';
// import { ConnectionComponent } from './components/pages/connection/connection.component';
// import { LogoutComponent } from './components/pages/logout/logout.component';
// import { SignupComponent } from './modules/connection/pages/signup/signup/signup.component';
// import { MeComponent } from './components/pages/me/me.component';
// import { DeleteUserComponent } from './components/pages/delete-user/delete-user.component';
// import { UserComponent } from './components/pages/user/user.component';
import { AuthGuard } from './core/guards/auth.guard';
// import { CreateProductComponent } from './components/pages/create-product/create-product.component';
// import { DeleteProductComponent } from './components/pages/delete-product/delete-product.component';
// import { ModifyProductComponent } from './modules/product/pages/modify-product/modify-product.component';
// import { HomeComponent } from './modules/home/pages/home/home/home.component';
import { Error404Component } from './core/components/error404/error404.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { LegalComponent } from './core/components/legal/legal.component';

const routes: Routes = [
    { path: 'contact', component: ContactComponent },
    { path: 'legal', component: LegalComponent },
    // { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    // { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
    // { path: 'products/:user', component: UserProductsComponent, canActivate: [AuthGuard] },
    // { path: 'newproduct/create', component: CreateProductComponent, canActivate: [AuthGuard] },
    // { path: 'product/delete/:id', component: DeleteProductComponent, canActivate: [AuthGuard] },
    // { path: 'product/modify/:id', component: ModifyProductComponent, canActivate: [AuthGuard] },
    // { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: ConnectionComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'register', component: SignupComponent },
    // { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
    // { path: 'user/delete/:id', component: DeleteUserComponent, canActivate: [AuthGuard] },
    // { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
    // { path: 'user/notloggedin', component: UserComponent, canActivate: [AuthGuard] },
    { 
        path: 'home',  
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    { 
        path: 'auth',  
        loadChildren: () => import('./modules/connection/connection.module').then(m => m.ConnectionModule)
    },
    { 
        path: 'home',  
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    { 
        path: 'account',  
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'product', 
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: Error404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash : true } )],
    exports: [RouterModule]
})
export class AppRoutingModule {}
