import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { Error404Component } from './core/components/error404/error404.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { LegalComponent } from './core/components/legal/legal.component';

const routes: Routes = [
    { 
        path: 'home',  
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    { 
        path: 'auth',  
        loadChildren: () => import('./modules/connection/connection.module').then(m => m.ConnectionModule)
    },
    { 
        path: 'account',  
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
        canActivate:[AuthGuard]
    },
    {
        path: 'product', 
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard]
    },
    { path: 'contact', component: ContactComponent },
    { path: 'legal', component: LegalComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: Error404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash : true } )],
    exports: [RouterModule]
})
export class AppRoutingModule {}
