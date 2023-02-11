import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { ProductComponent } from './components/partials/product/product.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { UsersComponent } from './components/pages/users/users.component';
import { ConnectionComponent } from './components/pages/connection/connection.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MeComponent } from './components/pages/me/me.component';
import { ModifyUserComponent } from './components/partials/modify-user/modify-user.component';
import { DeleteUserComponent } from './components/partials/delete-user/delete-user.component';
import { UserComponent } from './components/pages/user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProductsComponent } from './components/pages/user-products/user-products.component';
import { CreateProductComponent } from './components/pages/create-product/create-product.component';
import { DeleteProductComponent } from './components/pages/delete-product/delete-product.component';
import { ModifyProductComponent } from './components/partials/modify-product/modify-product.component';
import { ProductFormComponent } from './components/partials/product-form/product-form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { HomeFooterComponent } from './components/partials/home-footer/home-footer.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LegalComponent } from './components/pages/legal/legal.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ProductComponent,
        ProductsComponent,
        UsersComponent,
        ConnectionComponent,
        SignupComponent,
        MeComponent,
        ModifyUserComponent,
        DeleteUserComponent,
        UserComponent,
        UserProductsComponent,
        CreateProductComponent,
        DeleteProductComponent,
        ModifyProductComponent,
        ProductFormComponent,
        HomeComponent,
        Error404Component,
        HomeFooterComponent,
        ContactComponent,
        LegalComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
