/* eslint-disable no-underscore-dangle */
import {
    Component, OnInit, OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from '../../../services/db.service';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';
import { URL } from '@core/constants/url';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();

    catchPhrase: string = '';
    priceRange: number = 50000;
    maxPriceRange: number = 50000;
    searchString: string = '';
    productList: Product[] = [];
    resultList: Product[] = [];
    images: any = {};

    constructor(
        private productsService: DbService,
    ) { }

    ngOnInit(): void {
        this.setRandomCatchPhrase();
        this.productsService.getAllProducts()
            .subscribe((response: Product[]) => {
                this.productList = response;
                this.resultList = this.productList;
                this.sortByAscendingPrice();
                this.maxPriceRange = Math.ceil(this.getMaxPrice() / 10) * 10;
                this.priceRange = this.maxPriceRange;
                this.setImages();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setRandomCatchPhrase() {
        const randomNumber = Math.floor(Math.random() * 10);
        const randomCatchPhrases: string[] = ['What color is your Bugatti? 😎', 'When Lambo? How about now? 🚀', 'Drive it like you stole it 🚨', 'Just pick one, they all make the same sound 🔔', 'Harder, Better, Fastest, Stronger 🏎️', 'Do you feel the need? 🚦', 'You can\'t handle the thrust 🏁', 'There\'s no place like home, but a McLaren comes close 🏠'];
        const randomIndex = randomNumber % randomCatchPhrases.length;
        this.catchPhrase = randomCatchPhrases[randomIndex];
    }

    setImages() {
        for (const product of this.productList) {
            this.productsService.getAllImages(product.id)
                .subscribe((response: CarImage[]) => {
                    this.images[product.id] = response.map(image => `${URL.IMAGE}${image.id}`)[0];
                });
        }
    }

    getMaxPrice(): number {
        let maxPrice = this.productList[0].Price;
        
        for (let i = 1; i < this.productList.length; i += 1) {
            if (this.productList[i].Price > maxPrice) {
                maxPrice = this.productList[i].Price;
            }
        }

        return Math.ceil(maxPrice / 100);
    }

    sortByAscendingPrice(): void {
        this.resultList.sort((a, b) => a.Price - b.Price);
    }

    sortByDescendingPrice() {
        this.resultList.sort((a, b) => b.Price - a.Price);
    }

    updateResult() {
        this.resultList = this.productList.filter((product) => {
            const name = product.BrandName.toLowerCase();
            const description = product.Description.toLowerCase();
            const search = this.searchString.toLowerCase();

            const isNameMatch = name.includes(search);
            const isDescriptionMatch = description.includes(search);
            const isWithinPriceRange = product.Price <= this.priceRange * 100;

            return (isNameMatch || isDescriptionMatch) && isWithinPriceRange;
        });
    }
}
