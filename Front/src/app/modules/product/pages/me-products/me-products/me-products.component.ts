import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { Product } from '@core/models/Product';
import { User } from '@core/models/Users';
import { Subscription } from 'rxjs';
import { CarImage } from '@core/models/Images';
import { URL } from '@core/constants/url';

@Component({
  selector: 'app-me-products',
  templateUrl: './me-products.component.html',
  styleUrls: ['./me-products.component.scss']
})
export class MeProductsComponent implements OnInit {
  protected subscription: Subscription = new Subscription();
  productList: Product[] = [];
  resultList: Product[] = [];

  paramID: string = '';

  currentUser: string = '';
  currentUserID: string = '';


  images: any = {};

  constructor(
    private productsService: DbService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.productsService
      .getAllProductsFromSelf()
      .subscribe((response: Product[]) => {
        this.productList = response;
        this.setImages();
      });


    this.usersService.me()
      .subscribe((res: Partial<User>) => {
        this.currentUser = res.Name ?? 'Test';
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  back(): void {
    ['user', 'userID'].forEach((value) => sessionStorage.removeItem(value));
    this.router.navigateByUrl(`user/${this.currentUserID}`);
  }

  setImages() {
    for (const product of this.productList) {
      this.productsService.getAllImages(product.id)
        .subscribe((response: CarImage[]) => {
          this.images[product.id] = response.map(image => `${URL.IMAGE}${image.id}`)[0];
        });
    }
  }
}
