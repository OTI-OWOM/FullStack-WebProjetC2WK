import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductsComponent } from './pages/user-products/user-products/user-products.component';
import { ProductsComponent } from './pages/products/products/products.component';
import { ProductCarComponent } from './pages/product-car/product-car/product-car.component';
import { CreateProductComponent } from './pages/create-product/create-product/create-product.component';
import { DeleteProductComponent } from './pages/delete-product/delete-product/delete-product.component';
import { ModifyProductComponent } from './pages/modify-product/modify-product/modify-product.component';
import { MeProductsComponent } from './pages/me-products/me-products/me-products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'car/:id', component: ProductCarComponent },
  { path: 'car/user/:user', component: UserProductsComponent },
  { path: 'cars/user/self', component: MeProductsComponent },
  { path: 'create', component: CreateProductComponent },
  { path: 'car/delete/:id', component: DeleteProductComponent },
  { path: 'car/modify/:id', component: ModifyProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
