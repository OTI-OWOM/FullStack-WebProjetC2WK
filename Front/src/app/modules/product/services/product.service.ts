import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { CarDetail } from '@core/models/Details';
import { Product } from '@core/models/Product';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Message } from '@core/models/Message';

@Injectable()
export class ProductService {

  constructor(private dbService: DbService, private router: Router) { }

  async submitCarDetails(carDetails: Partial<CarDetail>[], selectedCarId: number) {
    if (!carDetails) {
      carDetails = [];
    }

    if (selectedCarId && carDetails.length > 0) {
      return new Promise((resolve, reject) => {
        this.dbService.createCarDetail(
          selectedCarId, carDetails
        ).subscribe({
          next: (res: any) => {
            resolve(res.message);
          },
          error: (err: any) => {
            resolve(err.message);
          }
        });
      });
    } else {
      return Promise.resolve('Please add at least one car detail.');
    }
  }

  async submit(
    data: Partial<Product>, 
    selectedImages: File[], 
    carDetails: Partial<CarDetail>[]
    ): Promise<Message> {
    let message: Message;
    if (!data.Year || !data.Price || !data.Description) {
      return { Value: 'Required data is missing', ok: false };
    }

    try {
      const productCreationResponse = await firstValueFrom(this.dbService.createProduct(data)) as { message: string; carId: string; };
      const selectedCarId = parseInt(productCreationResponse.carId);

      if (selectedImages.length > 0) {
        await firstValueFrom(this.dbService.uploadCarImage(selectedCarId, selectedImages));
      }

      message = await this.submitCarDetails(carDetails, selectedCarId)
        .then(() => {
          return { Value: productCreationResponse.carId, ok: true };
        })
        .catch((err: any) => {
          return { Value: `Error uploading details ${err}`, ok: false };
        });

      return message;
    } catch (err) {
      return { Value: 'An unknown error occurred', ok: false };
    }
  }

  async submitModify(
    data: Partial<Product>, 
    selectedImages: File[], 
    carDetails: Partial<CarDetail>[], 
    productId: string, 
    imagesToRemove: number[]
    ): Promise<Message> {
    let message: Message;

    try {
      const productCreationResponse = await firstValueFrom(this.dbService.modifyProduct(productId, data)) as { message: string };

      if (selectedImages.length > 0) {
        await firstValueFrom(this.dbService.uploadCarImage(parseInt(productId), selectedImages));
      }

      for (const imageId of imagesToRemove) {
        await firstValueFrom(this.dbService.deleteCarImage(imageId));
      }

      message = await this.submitCarDetails(carDetails, parseInt(productId))
        .then(() => {
          return { Value: productCreationResponse.message, ok: true };
        })
        .catch((err: any) => {
          return { Value: `Error uploading details ${err}`, ok: false };
        });

      return message;
    } catch (err) {
      return { Value: `An unknown error occurred ${err}`, ok: false };
    }
  }
}
