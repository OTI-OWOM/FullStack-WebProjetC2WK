import { Component, Input } from '@angular/core';
import { Product } from '@core/models/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
    @Input() images: any = {};
    @Input() resultList:Product[] = [];;
}
